// DO NOT TOUCH

import express from 'express';
import cors from 'cors';
import ImageRouter from '../routes/ImageRouter';
import PlanetRouter from '../routes/PlanetRouter';
import AstronautRouter from '../routes/AstronautRouter';
import { serverProperty } from './serverProperty';
import { Server } from './model';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/images', ImageRouter);
app.use('/planets', PlanetRouter);
app.use('/astronauts', AstronautRouter);


let server: Server;
server = { http: null, start: startServer };

async function startServer() {
	return new Promise(function (resolve, reject) {
		if (server.http != null) {
			resolve(null);
			return;
		}
		server.http = app.listen(serverProperty.port || 2025, () => console.log(`server listen: ${serverProperty.host}:${serverProperty.port || 2025}`));
		resolve(null);
	});
}



export default server;

