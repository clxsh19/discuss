// 'INSERT INTO post_votes (user_id, post_id, vote_type) VALUES ($1, $2, $3)',
// 'UPDATE posts SET vote_count = vote_count + $1 WHERE post_id = $2'
//SELECT 
// s.subreddit_id,
// s.name AS sub_name,
// s.display_name,
// s.description,
// s.members_count,
// s.created_at,
// s.logo_url,
// s.banner_url,
// COALESCE(sm.role, 'none') AS user_role
// FROM subreddits s
// LEFT JOIN subreddit_members sm 
//   ON s.subreddit_id = sm.subreddit_id 
//   AND sm.user_id = $1
// WHERE s.name = $2`,
/* 
raw(`${name} = sm`)
query('posts')
.leftJoin("subreddit_members as sm", `raw("# = sm.subreddit_id",[name])`)
.and("sm.suer_id = #", userId)
.where(raw('s.name','=',''))
.select(
  'user_id', 
  'post_id', 
  '', 
  ...)
.where('s.name', name)

query('posts')
.leftJoin("subreddit_members sm", "s.subreddit_id = sm.subreddit_id")
.and("sm.suer_id = ", userId)
.select(
  'user_id', 
  'post_id', 
  '', 
  ...)
.where('s.name', name)




*/


class QueryBuilder {
  #queryType: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | null = null;
  #tableName: string;
  #expression= '';
  #joins = '';
  #conditions:string[] = [];
  #values = [];

  constructor(tableName: string) {
    this.#tableName = tableName;
  }

  select(expr: string) {
    this.#queryType = 'SELECT';
    this.#expression = expr;
    return this;
  }

  insert() {
    this.#queryType = 'INSERT';
    return this;
  }

  update() {
    this.#queryType = 'UPDATE';
    return this;
  }

  delete() {
    this.#queryType = 'DELETE';
    return this;
  }

  leftJoin() {

  }

  where(condition:string, value:[]) {
    this.#conditions.push(`WHERE ${condition} = $${this.#values.length + 1}`)
    value.forEach((val) => this.#values.push(val))
  }

  build() {
    /* 
    switch(querytype)
      case(select): 
        query = `select ${expr} from ${table_name} where `
        query(post).where('tabel_name', value1).And('t2', value2).select(a,b,c);
        select a,b,c from posts where tabel_name = $1 And t2 = $2
    */
  }




}
