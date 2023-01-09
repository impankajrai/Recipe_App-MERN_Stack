// exports.request=async(URL,method,body,credential=false,headers=true)=>{
//   const res = await fetch(`http://localhost:4000/api${URL}`, {
//     method: method,
//     credentials: credential?"include":"omit",
//     headers: headers&& {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify(body),
//   });
//   return await res.json();
// }

const request={
  post: async (URL, body, credential = false, headers = true) => {
    const res = await fetch(`http://localhost:4000/api${URL}`, {
      method: "post",
      credentials: credential ? "include" : "omit",
      headers: headers && {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  },

  get:async(URL,credential = false, headers = true)=>{
      const res = await fetch(`http://localhost:4000/api${URL}`, {
        method: "get",
        credentials: credential ? "include" : "omit",
        headers: headers && {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      });
      return await res.json();
    },
}

export default request