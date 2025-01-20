import axios from "axios"

const api=axios.create({
    baseURL:process.env.REACT_APP_BACKEND_URL
})

// Fetch student details (this is an example, modify based on your actual API endpoint)


export const fetchStudentDetails=(userr)=>api.post(`/api/student/detail`,userr,{withCredentials:true});

export const fetchUserstudent=(userid)=>api.get(`/api/student/get/${userid}`)

// Update student profile
export const updateStudentProfile =(studentData) => api.post(`/api/student/update`, studentData, {withCredentials: true});



// export const manualAuth = (userr) => api.post(`/api/user/manual`, userr, {withCredentials: true})
// 




// export const fetchStudentDetails = async () => {
//     const response = await axios.get("/api/student/details");
//     return response.data;
//   };
  
//   // Update student profile
//   export const updateStudentProfile = async (studentData) => {
//     const response = await axios.put("/api/student/update", studentData);
//     return response.data;
//   };