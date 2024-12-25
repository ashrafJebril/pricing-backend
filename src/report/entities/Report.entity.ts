import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  expression: `
    SELECT
      (SELECT COUNT(1) FROM users) AS total_user,
      (SELECT COUNT(1) FROM users u WHERE u."role" = 'user') AS total_users_user_role,
      (SELECT COUNT(1) FROM users u WHERE u."role" = 'admin') AS total_users_admin_role,
      (SELECT COUNT(1) FROM users u WHERE u."role" = 'moderator') AS total_users_moderator_role,
      (SELECT COUNT(1) FROM "quote" q) AS total_quotes,
      (SELECT COUNT(1) FROM "quote" q WHERE status = 'draft') AS total_draft_quotes,
      (SELECT COUNT(1) FROM "quote" q WHERE status = 'ready') AS total_ready_quotes,
      (SELECT COUNT(1) FROM "quote" q WHERE status = 'sent') AS total_sent_quotes,
      (SELECT COUNT(1) FROM "quote" q WHERE DATE("createdAt") = CURRENT_DATE) AS total_quotes_today
  `,
})
export class Report {
  @ViewColumn()
  total_user: number;

  @ViewColumn()
  total_users_user_role: number;

  @ViewColumn()
  total_users_admin_role: number;

  @ViewColumn()
  total_users_moderator_role: number;

  @ViewColumn()
  total_quotes: number;

  @ViewColumn()
  total_draft_quotes: number;

  @ViewColumn()
  total_ready_quotes: number;

  @ViewColumn()
  total_sent_quotes: number;

  @ViewColumn()
  total_quotes_today: number;
}
