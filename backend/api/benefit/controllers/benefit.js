'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    findUsersBenefits: async (ctx) => {
        const user = ctx.state.user;

        if (!user) {
          return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
        }
    
        const { id } = user;
        const data = await strapi.plugins['users-permissions'].services.user.fetch({ id });
    
        ctx.body = data.benefits;
      },
};
