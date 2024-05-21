import { db } from '../../models/index.js';

const hashtagQuery = {
  findOrCreate: async hashtag => {
    const result = await Promise.all(
      hashtag.map(tag => {
        return db.Hashtag.findOrCreate({
          where: { tag: tag.slice(0).toLowerCase() },
        });
      }),
    );
    return result;
  },
};

export { hashtagQuery };
