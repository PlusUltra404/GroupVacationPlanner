import axios from "axios";


export default class APIService{
     

    create_user(firstname,lastname,email,username,password,mobile,intro,profile){
        return axios.post(`/api/register`,{firstname: firstname,lastname: lastname,email: email,username: username,password: password
        ,mobile: mobile, intro: intro, profile: profile})
    }

    get_user(username){
      return axios.post(`/api/user`, {username: username} )

    }

    update_user(username, email, password,intro, mobile,firstname,lastname) {
      return axios.post(`/api/update`, {username: username, email: email, password: password, intro: intro, mobile: mobile, firstname: firstname, lastname: lastname})

    }

    login(user, password){
        return axios.post(`/api/token`, {username: user, password: password})
    }




    message(user, password){
      axios.get(`/api/chatscreen`, {username: user, password: password})
    }

    joingroup(username, group){
      return axios.post(`/api/get-started`, {username: username, group: group })
    }

    creategroup(username , title,  profile){
      return axios.post(`/api/get-started`, {username: username, title: title , profile: profile})
    }
    
    save_event(user , title, date, content, group_id){
      return axios.post(`/api/event`, {user: user, title: title , date: date, content: content, group_id:group_id})
    }

    get_event(user){
      return axios.post(`/api/events`,{user: user})
    }

    get_groups(user){
      return axios.post(`/api/groups`, {user: user})
    }



   /* logout() {
        this.user_token = 0;
        this.config = {
            headers: {
                Authorization: 'Bearer ' + props.token
              }
        }
    }

    */


}


