import axios from "axios";




const baseURL = "http://localhost:5000";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] =
  "http://localhost:3000";
axios.defaults.withCredentials = true;





export default class APIService{
     

     create_user(firstname,lastname,email,username,password,mobile,intro,profile){
        return axios.post(`${baseURL}/api/register`, {firstname: firstname,lastname: lastname,email: email,username: username,password: password
        ,mobile: mobile, intro: intro, profile: profile})
        .then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });
        
    }

    login(user, password){
        return axios.post(`${baseURL}/api/token/`, {username: user, password: password})
    }



    message(user, password){
      axios.get(`${baseURL}/api/chatscreen`, {username: user, password: password})
    }

    joingroup(user, group, status){
      return axios.post(`${baseURL}/api/get-started`, {user: user, group: group , status: status})
    }

    creategroup(user , title, status, profile){
      return axios.post(`${baseURL}/api/get-started`, {created_by: user, title: title , status: status, profile: profile})
    }
    
    save_event(user , title, date, content, group_id){
      return axios.post(`${baseURL}/api/exam`, {user: user, title: title , date: date, content: content, group_id:group_id})
    }

/*    get_events(group, month){
      axios.get(`${baseURL}/api/chatscreen`, {username: user, password: password})
      

    }

    

   logout() {
        this.user_token = 0;
        this.config = {
            headers: {
                Authorization: 'Bearer ' + props.token
              }
        }
    }

  */  


}


