import { createContext, useContext, useState } from 'react';









;
  setFieldLoading=> void;
  clearForm) => void;
  validations;
  validateField=> void;
  touchedFields;
  setFieldTouched=> void;
}

const AuthContext = createContext(undefined);

function validateEmail(email){
  if (!email) return { isValid;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { isValid, message: 'Please enter a valid email address' };
  }
  return { isValid;
}

function validatePassword(password){
  if (!password) return { isValid;
  if (password.length ({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState({
    email: { isValid,
    password: { isValid,
    name: { isValid,
    confirmPassword;
  const [touchedFields, setTouchedFields] = useState({});

  const setFieldTouched = (field) => {
    setTouchedFields(prev => ({ ...prev, [field]);
  };

  const validateField = (field, value) => {
    let validation;

    switch (field) {
      case 'email'= validateEmail(value);
        break;
      case 'password'= validatePassword(value);
        break;
      case 'name'= validateName(value);
        break;
      case 'confirmPassword'= value === formData.password 
          ? { isValid: true }
          : { isValid, message: 'Passwords do not match' };
        break;
      default= { isValid;
    }

    setValidations(prev => ({
      ...prev,
      [field]);
  };

  const setFormData = (data) => {
    setFormDataState(prev => {
      const newData = { ...prev, ...data };
      // Validate the changed fields
      Object.entries(data).forEach(([field, value]) => {
        validateField(field;
        // Mark field;
      });
      // If password changed, revalidate confirmPassword
      if (data.password && prev.confirmPassword) {
        validateField('confirmPassword', prev.confirmPassword);
      }
      return newData;
    });
  };

  const setFieldLoading = (field, loading) => {
    setIsLoading(prev => ({ ...prev, [field]);
  };

  const clearForm = () => {
    setFormDataState({
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    });
    setIsLoading({});
    setValidations({
      email: { isValid,
      password: { isValid,
      name: { isValid,
      confirmPassword;
    setTouchedFields({});
  };

  return (
    
      {children}
    
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 