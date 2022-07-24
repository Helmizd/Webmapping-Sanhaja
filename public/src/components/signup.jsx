import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();

export default function SignUp(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    document.getElementById('failUser').style.display = "none"
    document.getElementById('successUser').style.display = "none"
    let info = {name:data.get('firstName'),lastname:data.get('lastName'),email:data.get('email'),password:data.get('password'), role:'2'}
    fetch(`http://127.0.0.1:3001/users/create`, {
      body: JSON.stringify(info),
      headers: { "content-type": "application/json" },
      method: "POST",
      })
        .then(async (result) => {
          result = await result.json();
          console.log(result)
          if (result.status == "success") {
              document.getElementById('successUser').style.display = "block"
          }else{
            document.getElementById('failUser').style.display = "block"
          }
        })
        .catch((err) => {
            console.log("err", err);
            document.getElementById('failUser').style.display = "block"
          });
          setTimeout(()=>{
              document.getElementById('failUser').style.display = "none"
              document.getElementById('successUser').style.display = "none"
          },3000)
  };


  const createUser = ()=>{
    
    
    
}
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            تسجيل
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
           
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="الأسم"
                  autoFocus
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="اللقب"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="البريد الإلكتروني"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="كلمة السر"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              تسجيل
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#"onClick = {()=>props.handler("sign")} variant="body2">
                  لديك حساب بالفعل ؟ سجل دخولك
                </Link>
              </Grid>
              
            </Grid>
            <Grid container  >
            <div id="successUser" class="alert alert-success" role="alert" style={{display:'none',marginTop:"20px",width:'100%',textAlign:'center'}}>
                                                تم تسجيل
                                        </div>
                                        <div id="failUser" class="alert alert-danger" role="alert" style={{display:'none',marginTop:"20px"}}>
                                               خطأ في تسجيل
                                        </div>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}