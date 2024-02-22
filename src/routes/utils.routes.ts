import express, { Request, Response } from 'express';
import os from 'os';
import { formatBytes } from '../helpers/formatter.helpers';


const router = express.Router();

const getEndpointsInfo = () => {
    const endpointsInfo: any[] = []
    router.stack.forEach((layer: any) => {
        if (layer.route) {
            const methods = Object.keys(layer.route.methods).map(method => method.toUpperCase())
            endpointsInfo.push({
                path: layer.route.path,
                methods,
            })
        }
    })
    return endpointsInfo
}


// Endpoint to check server health
router.get('/health-check', (req: Request, res: Response) => {
    const uptimeInSeconds = process.uptime();
    const serverStartTime = new Date(Date.now() - uptimeInSeconds * 1000).toISOString();

    const cpuLoad = os.loadavg();
    const formattedCpuLoad = cpuLoad.map((load) => load.toFixed(2) + '%');

    const healthInfo = {
        status: '✅',
        serverStartTime,
        uptime: uptimeInSeconds.toFixed(2) + ' seconds',
        cpuUsage: formattedCpuLoad,
        memoryUsage: {
            rss: formatBytes(os.totalmem() - os.freemem()),
            heapTotal: formatBytes(process.memoryUsage().heapTotal),
            heapUsed: formatBytes(process.memoryUsage().heapUsed),
            external: formatBytes(process.memoryUsage().external),
        },
        endpoints: getEndpointsInfo(),
    };

    res.status(200).json(healthInfo);
});

export default router;
