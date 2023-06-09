import React, { useState , useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Button, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { red , amber, grey } from "@mui/material/colors";

export default function UserCreate() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    UserGet();
  }, []);

  const UserGet = () => {
    fetch("http://dev.opensource-technology.com:3000/api/posts/")
      .then((res) => res.json())
      .then((result) => {
        setItems(result.posts);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      content: content,
      title: title,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "http://dev.opensource-technology.com:3000/api/posts",
      requestOptions
    );
    alert("Add data Success :)");
    window.location.href = "draft";
  };
  

  // Publish
  const UserPublish = (event) => {
    event.preventDefault();
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      published: published,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "http://dev.opensource-technology.com:3000/api/posts/",
      requestOptions
    );
    alert("Published)");
    window.location = "/";
    UserGet();
  };



  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState("");

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ padding: 5 }}>
        <Paper sx={{ my: 10, p: 4 }} style={{ backgroundColor: amber[100] }}>
          <Typography align="center" variant="h3" gutterBottom>
            New Post
          </Typography>
          <form onSubmit={handleSubmit}>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ backgroundColor: amber[50] }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="content"
                  label="Content"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setContent(e.target.value)}
                  style={{ backgroundColor: amber[50] }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  style={{ color: grey[900], backgroundColor: amber[700] }}
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  href="/"
                  variant="contained"
                  fullWidth
                  style={{ color: grey[900], backgroundColor: red['A200'] }}
                >
                  Cancel
                </Button>
              </Grid>

              <Grid item xs={12}>
                <form onSubmit={UserPublish}>
                <Button
                  variant="contained"
                  fullWidth
                  style={{ color: grey[900], backgroundColor: amber[900] }}
                  onChange={(e) => setPublished(e.target.value)}
                >
                  Publish Now
                </Button>

                </form>
                
              </Grid>
            </Grid>

          </form>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
