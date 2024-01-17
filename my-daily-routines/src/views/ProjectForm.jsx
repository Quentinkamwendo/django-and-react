import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StateContext } from "../ContextProvider";
import { CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
// import { MuiFileInput } from "mui-file-input";

const ProjectForm = () => {
  const queryClient = useQueryClient();

  const [images, setImages] = useState(null);
  const [video, setVideo] = useState(null);
  const [documentation, setDocumentation] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(StateContext);
  const handleImageChange = (e) => setImages(e.target.files[0]);
  const handleVideoChange = (e) => setVideo(e.target.files[0]);
  const handleDocumentationChange = (e) => setDocumentation(e.target.files[0]);

  const singleProject = async (id) => {
    const response = await axios.get(`/api/projects/${id}/`);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryFn: () => singleProject(id),
    queryKey: ["one-project", id],
    enabled: !!id,
  });

  const { mutate } = useMutation(
    async (data) => {
      //    Perform image processing logic here if needed
      const formData = new FormData();
      formData.append("project_name", data.project_name);
      formData.append("description", data.description);
      formData.append("start_date", data.start_date);
      formData.append("end_date", data.end_date);
      formData.append("images", images);
      formData.append("video", video);
      formData.append("documentation", documentation);

      if (id) {
        const response = await axios.patch(`/api/projects/${id}/`, formData);
        return response.data;
      } else {
        const response = await axios.post("api/projects/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      }
    },
    {
      onSuccess: () => {
        setLoading(false);
        //Invalidate and refetch the projects query after successful mutation
        queryClient.invalidateQueries(["projects"]);
        toast.success("Project created successfully 🔥");
        navigate("/dashboard");
      },
      onError: () => {
        setLoading(false);
        toast.error("error creating the project 😩");
      },
    }
  );

  const onSubmit = (data) => {
    setLoading(true);
    mutate(data);
  };

  if (error) return error;
  if (id && isLoading)
    return (
      <CircularProgress
        color="inherit"
        className="items-center mx-auto justify-center"
      />
    );

  return (
    <div className="w-full max-w-xl mx-auto">
      <h3 className="text-center font-semibold">{id ? "Update Project" : "Create project"}</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"}
      >
        <label htmlFor="project_name">Project Name:</label>
        <input
          {...register("project_name", {
            required: {
              value: true,
              message: "You must enter the project name",
            },
            minLength: {
              value: 4,
              message: "Your project name must be at least 4 characters",
            },
          })}
          className="shadow form-input border rounded w-full py-2 px-3 text-gray-700"
          type="text"
          name="project_name"
          defaultValue={data?.project_name || ""}
          id="project_name"
        />
        {errors.project_name && (
          <p className="text-red-500">{errors.project_name.message}</p>
        )}
        <label htmlFor="description">Description:</label>
        <textarea
          {...register("description")}
          className="shadow form-input border rounded w-full py-2 px-3 text-gray-700"
          name="description"
          defaultValue={data?.description || ""}
          id="description"
          rows="3"
        ></textarea>
        <label htmlFor="start_date">Start Date</label>
        <input
          {...register("start_date", {
            required: {
              value: true,
              message: "Start Date is required",
            },
          })}
          className="shadow form-input border rounded w-full py-2 px-3 text-gray-700"
          type="date"
          name="start_date"
          defaultValue={data?.start_date || ""}
          id="start_date"
        />
        {errors.start_date && (
          <p className="text-red-500">{errors.start_date.message}</p>
        )}
        <label htmlFor="end_date">End Date</label>
        <input
          {...register("end_date", {
            required: {
              value: true,
              message: "End Date is required",
            },
          })}
          className="shadow form-input border rounded w-full py-2 px-3 text-gray-700"
          type="date"
          name="end_date"
          defaultValue={data?.end_date || ""}
          id="end_date"
        />
        {errors.end_date && (
          <p className="text-red-500">{errors.end_date.message}</p>
        )}
        
        {/* <MuiFileInput
          size="small"
          variant="outlined"
          value={images}
          onChange={handleImageChange}
          getInputText={(images) => images ? images.name: ''}
          getSizeText={(file) => file ? file.size.toFixed(2) : 0}
          inputProps={{ accept: ".png, .jpeg" }}
        /> */}

        <input
          // {...register('images')}
          type="file"
          onChange={handleImageChange}
          accept=".png, .jpeg"
          name="images"
          id="images"
        />
        <input
          // {...register('images')}
          type="file"
          onChange={handleVideoChange}
          accept="video/*, .mp4, .mkv"
          name="video"
          id="video"
        />
        <input
          // {...register('images')}
          type="file"
          onChange={handleDocumentationChange}
          accept=".docx, .doc, .pdf"
          name="documentation"
          id="documentation"
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type={"submit"}
        >
          {loading ? <CircularProgress color="inherit" /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
