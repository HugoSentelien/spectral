import { isAbsolute, join } from '@stoplight/path';
import { Optional } from '@stoplight/types';
import { httpAndFileResolver } from '../../../../resolvers/http-and-file';

export const getResolver = (resolver: Optional<string>) => {
  if (resolver !== void 0) {
    try {
      return require(isAbsolute(resolver) ? resolver : join(process.cwd(), resolver));
    } catch ({ message }) {
      throw new Error(message.split(/\r?\n/)?.[0] ?? message);
    }
  }

  return httpAndFileResolver;
};
