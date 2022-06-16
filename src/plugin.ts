import { default as fastifyPlugin } from "fastify-plugin";

import { processRequest, ProcessRequestOptions } from "./process-request.js";

export interface DepixyGraphqlUploadOptions extends ProcessRequestOptions {}

export const plugin = fastifyPlugin<DepixyGraphqlUploadOptions>(
  async (fastify, opts) => {
    fastify.addContentTypeParser("multipart", (req, _payload, done) => {
      req.mercuriusUploadMultipart = true;
      done(null);
    });

    fastify.addHook("preValidation", async (request, reply) => {
      if (!request.mercuriusUploadMultipart) {
        return;
      }

      request.body = await processRequest(request.raw, reply.raw, opts);
    });
  },
  {
    name: "@depixy/graphql-upload",
    dependencies: [],
    fastify: "4.x"
  }
);

declare module "fastify" {
  interface FastifyRequest {
    mercuriusUploadMultipart?: true;
  }
}
