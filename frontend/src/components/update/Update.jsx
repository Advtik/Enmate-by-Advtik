import { useState, useEffect } from "react";
import "./update.scss";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import makeRequest from "../../axios";
import { useLocation } from "react-router-dom";

const Update = ({ onClose }) => {
  const userId = useLocation().pathname.split("/")[2];

  // --------------------
  // FETCH USER
  // --------------------
  const { isLoading, error, data } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await makeRequest.get("/users/find/" + userId);
      return res.data;
    },
  });

  // --------------------
  // LOCAL STATE (SAFE DEFAULTS)
  // --------------------
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [site, setSite] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);

  // --------------------
  // SYNC STATE AFTER DATA LOAD
  // --------------------
  useEffect(() => {
    if (data) {
      setEmail(data.email || "");
      setName(data.name || "");
      setBio(data.bio || "");
      setCity(data.city || "");
      setSite(data.site || "");
      setStatus(data.status || "");
      setFile(data.profilepic || null);
    }
  }, [data]);

  // --------------------
  // UPLOAD IMAGE
  // --------------------
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.error("Image upload failed", err);
      return null;
    }
  };

  // --------------------
  // UPDATE PROFILE
  // --------------------
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedProfile) => {
      return makeRequest.put("/users", updatedProfile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      onClose();
    },
    onError: (err) => {
      console.error("Profile update failed:", err);
    },
  });

  // --------------------
  // SUBMIT HANDLER
  // --------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    let imgUrl = data.profilepic;
    if (file instanceof File) {
      const uploaded = await upload();
      if (uploaded) imgUrl = uploaded;
    }

    mutation.mutate({
      name,
      email,
      bio,
      city,
      site,
      status,
      profilepic: imgUrl,
    });
  };

  // --------------------
  // LOADING / ERROR
  // --------------------
  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Failed to load profile</div>;

  // --------------------
  // UI
  // --------------------
  return (
    <div className="overlay">
      <div className="profileModal">

        {/* LEFT FORM */}
        <div className="formSide">
          <div className="topBar">
            <h2>Update Profile</h2>
            <button className="close" onClick={onClose}>×</button>
          </div>

          <form className="profileForm" onSubmit={handleSubmit}>

            <div className="row">
              <span>Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="row">
              <span>Email</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="row">
              <span>Bio</span>
              <input value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>

            <div className="row">
              <span>City</span>
              <input value={city} onChange={(e) => setCity(e.target.value)} />
            </div>

            <div className="row">
              <span>Profile</span>
              <input value={site} onChange={(e) => setSite(e.target.value)} />
            </div>

            <div className="row">
              <span>Status</span>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            <div className="buttons">
              <button type="button" onClick={() => document.getElementById("fileinput").click()}>
                Change Photo
              </button>
              <button type="submit">Update</button>
            </div>

            <input
              id="fileinput"
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />

          </form>
        </div>

        {/* RIGHT IMAGE PREVIEW */}
        <div className="imageSide">
          {file instanceof File ? (
            <img src={URL.createObjectURL(file)} alt="preview" />
          ) : file ? (
            <img src={file} alt="profile" />
          ) : (
            <div className="placeholder">Upload<br />Photo</div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Update;
