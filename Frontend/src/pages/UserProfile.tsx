
import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import ProfileService from '../services/profile.service';
import { ProfileUserDTO } from '../dtos/profile.user.dto';

export default function UserProfile() {

  const [profileData, setProfileData] = useState<ProfileUserDTO>();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await ProfileService.getUser();
        setProfileData(data)
      } catch (error) {
       console.error("Error al obtener el perfil", error)
      } 
    }
    fetchProfile();
  }, []);

    return (
      <section className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f4f5f7' }}>
        <MDBContainer className="py-5">
          <MDBRow className="justify-content-center">
            <MDBCol lg="20" className="mb-20">
              <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                <MDBCardBody className="text-center">
                  <MDBCardImage src={profileData?.avatarUrl || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"}
                    alt="Avatar" className="my-5" style={{ width: '100px' }} fluid />
                  <MDBTypography tag="h5">{profileData?.firstName || "First Name" }</MDBTypography>
                  <MDBTypography tag="h5">{profileData?.lastname || "Lastname" }</MDBTypography>
                  

                  <MDBIcon far icon="edit mb-2" />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="20" className="mb-4">
              <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                <MDBCardBody className="p-4">
                  <MDBTypography tag="h6">Information</MDBTypography>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className="pt-1">
                    <MDBCol size="20" className="mb-3">
                      <MDBTypography tag="h6">Email</MDBTypography>
                      <MDBCardText className="text-muted">{profileData?.email || "info@example.com"}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }