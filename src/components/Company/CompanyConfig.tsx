import React, { useState, useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { observer } from 'mobx-react-lite';
import { DropzoneArea } from 'material-ui-dropzone';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import UserStore from '../../MobX/store/UserStore';
import InputColor from 'react-input-color';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CompanyStore from '../../MobX/store/CompanyStore';

function CompanyConfig() {
  const userStore = useContext(UserStore);
  const { userProfile, userProfileLoaded, getUserProfile } = userStore;

  const companyStore = useContext(CompanyStore);
  const { createCompanyConfig, updateCompanyConfig } = companyStore;
  const [color, setColor] = React.useState();
  const [companyLogo, setCompanyLogo] = useState({
    files: [],
  });

  const handleLogoChange = (files: any) => {
    setCompanyLogo({
      ...companyLogo,
      files: files,
    });
  };

  const uploadLogo = async (e: any) => {
    e.preventDefault();

    var uploadLogoFormData = new FormData();

    let file = companyLogo.files;
    for (let i = 0; i < file.length; i++) {
      uploadLogoFormData.append(`file`, file[i]);
    }

    try {
      let logo;
      if (companyLogo.files.length > 0) {
        const response = await axios({
          method: 'post',
          url: 'http://localhost:3001/api/expense/logo',
          data: uploadLogoFormData,
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        logo = response.data.data[0].logo;
      }

      if (userProfile.Company?.CompanyConfig == null) {
        const data = await createCompanyConfig(logo, color.hex);

        if (data) {
          getUserProfile();
        }
      }
      if (userProfile.Company?.CompanyConfig != null) {
        const data = await updateCompanyConfig(
          userProfile.Company?.CompanyConfig.id || 0,
          logo,
          color.hex
        );

        if (data) {
          getUserProfile();
        }
      }
    } catch (error) {}
  };

  return (
    <div>
      <Grid
        className='statAndMixed'
        container
        direction='row'
        justify='center'
        spacing={2}
        style={{ margin: 0, width: '100%' }}
      >
        <Grid item xs={12} sm={8} md={6} lg={6}>
          <Card variant='outlined' className='cardRaiased'>
            <CardContent>
              <div
                className='ProfileSettings'
                style={{
                  display: 'flex',
                  textAlign: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  margin: '0',
                  wordSpacing: 'none',
                }}
              >
                {userProfile.Company?.CompanyConfig?.logo ? (
                  <img
                    src={userProfile.Company?.CompanyConfig?.logo.toString()}
                    style={{height: '60px', width:'100px'}}
                  />
                ) : (
                  <Avatar
                    //   className={classes.orange}
                    style={{ height: '90px', width: '90px' }}
                  >
                    <h1 style={{ fontSize: '40' }}>
                      {(userProfile.Company?.name || '?').charAt(0)}
                    </h1>
                  </Avatar>
                )}

                <Typography style={{ marginTop: 'auto' }} variant='h4'>
                  {userProfile.Company?.name}
                </Typography>
                <Typography
                  style={{
                    marginTop: 'auto',
                    fontWeight: 'bold',
                    color: '#7B7D7D',
                  }}
                >
                  {userProfile.Company?.businessArea}
                </Typography>
              </div>

              <div>
                <Typography
                  style={{
                    marginTop: 'auto',
                    fontWeight: 'bold',
                  }}
                >
                  Color:
                </Typography>
                <InputColor
                  initialValue={
                    userProfile.Company?.CompanyConfig?.appBarColor.toString() ||
                    '#5e72e4'
                  }
                  onChange={setColor}
                  placement='right'
                />
                <Typography
                  style={{
                    marginTop: 'auto',
                    fontWeight: 'bold',
                  }}
                >
                  Company Logo:
                </Typography>
                <DropzoneArea
                  acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                  maxFileSize={5000000}
                  filesLimit={1}
                  onChange={handleLogoChange}
                  //   initialFiles={[
                  //     userProfile.Company?.CompanyConfig?.logo.toString() ||
                  //       'http://localhost:3001/images/userExpenses/1595349415091-drax.png',
                  //   ]}
                />
                <Button
                  color='primary'
                  style={{ float: 'right' }}
                  variant='contained'
                  onClick={uploadLogo}
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default observer(CompanyConfig);
