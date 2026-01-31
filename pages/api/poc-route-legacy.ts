import type { NextApiRequest, NextApiResponse } from 'next';

// Legacy PoC route disabled: local Dijkstra pathfinding has been removed.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(410).json({ status: 'gone', message: 'poc-route-legacy disabled' });
    return;
  }
  res.status(410).json({ error: 'poc-route-legacy disabled' });
}
