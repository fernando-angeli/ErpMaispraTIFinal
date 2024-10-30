import React, { useState, useEffect } from 'react';
import Reset from '../../components/ResetPasswordComponents/Reset';
import ResetPassbyToken from '../../components/ResetPasswordComponents/ResetPassbyToken'
import { useLocation } from 'react-router-dom';

function ResetPassword() {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token"); 
  const [NewPassword, setNewPassword] = useState(false);
console.log(token)
  useEffect(() => {
    if (token) {
      setNewPassword(true);
    }
  }, [token]);
  return (
    <div>
      {!NewPassword && <Reset />}
      {NewPassword && <ResetPassbyToken/>}
    </div>
  );
}

export default ResetPassword;