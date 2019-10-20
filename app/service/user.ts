import { Service } from "egg";
import * as uuidv4 from "uuid/v4";

class UserService extends Service {
  async query({ page, size, sortBy, sortOrder }) {
    const skip = (page - 1) * size;
    const limit = size;

    const query = {};

    const result = await this.ctx.model.User.find(query, {
      password: 0,
      refreshToken: 0
    })
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder, _id: -1 });

    const total = await this.ctx.model.User.find(query).countDocuments();

    return {
      list: result,
      total
    };
  }

  async info(id: string) {
    const data = this.ctx.model.User.findById(id);
    return data;
  }

  async create(data: any) {
    const uuid = uuidv4();
    const result = await this.ctx.model.User.create({
      ...data,
      refreshToken: uuid
    });
    return result;
  }

  async update(ids: Array<string>, data: any) {
    const result = await this.ctx.model.User.updateMany(
      { _id: { $in: ids } },
      { $set: data }
    );
    return result;
  }

  async destroy(ids: Array<string>) {
    const result = await this.ctx.model.User.deleteMany({
      _id: { $in: ids }
    });
    return result;
  }
}

export default UserService;
