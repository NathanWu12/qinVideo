import { Controller } from 'egg';

class SeasonController extends Controller {
	async query() {
		const { ctx, service } = this;
		const { query } = ctx;

		ctx.helper.validate('cateQuery', query);

		const result = await service.season.query(query).catch(() => 16000);
		ctx.helper.send(result);
	}

	async info() {
		const { ctx, service } = this;
		const id = ctx.params.id;

		ctx.helper.validate('id', { id });

		const result = await service.season.info(id).catch(() => 16001);
		ctx.helper.send(result);
	}

	async create() {
		const { ctx, service } = this;
		const data = ctx.request.body;

		ctx.helper.validate('season', data, true);

		const result = await service.season.create(data).catch(() => 16002);
		ctx.helper.send(result);
	}

	async update() {
		const { ctx, service } = this;
		const data = ctx.request.body;
		const id = ctx.params.id;

		ctx.helper.validate('id', { id });
		ctx.helper.validate('season', data);

		const result = await service.season.update([ id ], data).catch(() => 16003);
		ctx.helper.send(result);
	}

	async updateMany() {
		const { ctx, service } = this;
		const data = ctx.request.body;
		const { ids } = data;

		ctx.helper.validate('ids', { ids });
		ctx.helper.validate('season', data);

		const result = await service.season.update(ids, data).catch(() => 16003);
		ctx.helper.send(result);
	}

	async destroy() {
		const { ctx, service } = this;
		const id = ctx.params.id;

		ctx.helper.validate('id', { id });

		const result = await service.season.destroy([ id ]).catch(() => 16004);
		ctx.helper.send(result);
	}

	async destroyMany() {
		const { ctx, service } = this;
		const { ids, type } = ctx.request.body;

		ctx.helper.validate('ids', { ids });

		const result = await service.season.destroy(ids, type).catch(() => 16004);
		ctx.helper.send(result);
	}
}

export default SeasonController;
