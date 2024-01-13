import React, { FC } from 'react';
import LoginForm from 'components/Forms/AuthForms/LoginForm';
import Modal from 'components/Modals';
import RegisterForm from 'components/Forms/AuthForms/RegisterForm';

export const enum AuthModalNames {
  LOGIN = 1,
  REGISTER = 2,
}

interface AuthModalProps {
  modalTypeOpen: null | AuthModalNames;
  onClose: () => void;
}

const AuthModal: FC<AuthModalProps> = ({ modalTypeOpen, onClose }) => {
  return (
    <Modal onClose={onClose} open={modalTypeOpen !== null}>
      <>
        {modalTypeOpen === AuthModalNames.LOGIN && (
          <LoginForm closeModal={onClose} />
        )}
        {modalTypeOpen === AuthModalNames.REGISTER && (
          <RegisterForm closeModal={onClose} />
        )}
      </>
    </Modal>
  );
};

export default AuthModal;
