export interface Repo {
   
        name:string
        owner:{
          avatar_url:string
          login:string
  
        }
        description:string
        stargazers_count:number
        open_issues_count?:number
        created_at:string
   
}