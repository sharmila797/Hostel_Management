import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { updateStudentProfile,fetchStudentDetails } from "../services/student/studentServices"; // Replace with your actual API call

const ProfileUpdate = () => {
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    course: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the student's current profile data when the page loads
    const fetchProfileData = async () => {
      try {
        // Fetch student details using an API call (replace with actual API call)
        const response = await fetchStudentDetails();
        setStudentData(response.data);
      } catch (err) {
        setError("Error fetching profile data.");
      }
    };
    
    fetchProfileData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the API to update student profile
      await updateStudentProfile(studentData);
      navigate("/student-dashboard");
    } catch (err) {
      setError("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Update Profile
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          value={studentData.name}
          onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          fullWidth
          value={studentData.email}
          onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Course"
          fullWidth
          value={studentData.course}
          onChange={(e) => setStudentData({ ...studentData, course: e.target.value })}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          sx={{ width: "100%" }}
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Box>
  );
};

export default ProfileUpdate;
