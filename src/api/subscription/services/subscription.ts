/**
 * subscription service
 */

import { factories } from '@strapi/strapi';
import { DateTime } from 'luxon';

export default factories.createCoreService(
  'api::subscription.subscription',
  ({ strapi }) => ({
    async expireSubscriptions() {
      const nowIso = DateTime.now().toISO();
      strapi.log.info(`nowIso: ${nowIso}`);

      const subscriptions =
        await strapi.entityService.findMany('api::subscription.subscription', {
          filters: {
            status: 'active',
            end_date: { $lt: nowIso },
          },
          populate: {
            user_id: true,
          },
        });

      for (const subscription of subscriptions) {
        const subscriptionId = subscription.id;
        const userRelation = subscription.user_id as
          | { id?: number | string; data?: { id?: number | string } }
          | undefined;
        const userId = userRelation?.id ?? userRelation?.data?.id;

        try {
          await strapi.entityService.update(
            'api::subscription.subscription',
            subscriptionId,
            {
              data: { status: 'expired' },
            }
          );

          if (userId) {
            await this.revokeSubscriptionAccess(subscriptionId, userId);
          }

          strapi.log.info(
            `Suscripción ${subscriptionId} expirada y accesos revocados`
          );
        } catch (error) {
          strapi.log.error(
            `Error expirando suscripción ${subscriptionId}:`,
            error
          );
        }
      }
    },

    async revokeSubscriptionAccess(
      subscriptionId: number | string,
      userId: number | string
    ) {
      const studentCourses = await strapi.entityService.findMany(
        'api::student-course.student-course',
        {
          filters: {
            subscription: { id: subscriptionId },
            user: { id: userId },
            active: true,
          },
          fields: ['id'],
        }
      );

      await Promise.all(
        studentCourses.map(({ id }) =>
          strapi.entityService.update(
            'api::student-course.student-course',
            id,
            {
              data: { active: false },
            }
          )
        )
      );
    },
  })
);
