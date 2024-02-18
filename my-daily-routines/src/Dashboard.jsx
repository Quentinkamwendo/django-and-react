import { useQuery } from "@tanstack/react-query";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
// import Link from '@mui/material/Link';
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import { StateContext } from "./ContextProvider";
import axios from "axios";

export default function Dashboard() {
  const { token, user } = useContext(StateContext);

  const allProjects = async () => {
    const response = await axios.get("/api/projects/");
    return response.data;
  };
  const { data, isLoading, error } = useQuery({
    queryFn: allProjects,
    queryKey: ["projects"],
  });
  if (error) return error;
  if (isLoading)
    return (
      <CircularProgress
        color="inherit"
        className="items-center mx-auto justify-center"
      />
    );

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          {token}
          {/* <Chart /> */}
        </Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          {/* <Deposits /> */}
          {data.results.length}
          <Link to={"/projectView"}>View Project</Link>

          {/* {data.results.map((project) => (
                    <div key={project.id}>
                      <h3>{project.project_name}</h3>
                      <h5>{project.duration}</h5>
                      <p>{project.description}</p>
                      <img src={project.get_image_url} alt={`Project ${project.project_name}`} className="h-12 w-12" />
                      <iframe src={project.get_documentation_url} className="h-64 w-64"></iframe>
                      <object data={project.get_documentation_url} type="application/pdf" className="h-64 w-64"></object>
                      <video src={project.get_video_url} controls='controls' className='h-64 w-64'>
                        <source src={project.get_video_url} type='video/mp4' />
                      </video>
                    </div>
                  ))} */}
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          {user.username}
          {/* <Orders /> */}
        </Paper>
      </Grid>
    </Grid>
  );
}
