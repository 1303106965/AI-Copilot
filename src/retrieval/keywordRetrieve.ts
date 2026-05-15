import { db } from '../db/sqlite'

/**
 * 关键词检索
 */
export const keywordRetrieve = (
  query: string
) => {
  return new Promise((resolve) => {
    db.all(
      `
      SELECT *
      FROM schema_columns

      WHERE
        searchable_text LIKE ?

      LIMIT 10
      `,
      [
        `%${query}%`
      ],
      (err, rows) => {
        if (err) {
          console.error(err)

          resolve([])

          return
        }

        resolve(rows)
      }
    )
  })
}