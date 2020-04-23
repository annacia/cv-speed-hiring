import React from "react";
import { Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import { useFormik } from "formik";
import * as Yup from "yup";
// import FirebaseService from "../../services/FirebaseService"

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('Obrigatório'),
  senha: Yup.string()
    .min(6, 'Senha muito curta')
    .max(50, 'Senha muito grande')
    .required('Obrigatório'),
  senha_confirmacao: Yup.string()
    .oneOf([Yup.ref('senha'), null], 'As senhas devem ser iguais')
    .required('Obrigatório'),
  nome: Yup.string()
    .min(2, 'Nome muito curto')
    .max(150, 'Nome muito grande')
    .required('Obrigatório'),
  link_site: Yup.string()
    .required('Obrigatório'),
  avatar: Yup.string()
    .required('Obrigatório')
});

const UserEditForm = (props) => {
  const {email, descricao, link_site, nome, avatar } = props.data;
  
  const initialValues = { email, descricao, link_site, nome, avatar, senha: '', senha_confirmacao: ''}

  const formik = useFormik({
    initialValues,
    validationSchema
  });
  console.log(formik.values);
  
  const DisplayErrors = (props) => {
      const { msgError } = props
      return(
          <>
      {msgError && <span className="validate-error">
        {msgError}
      </span>}
      </>
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()
    let errors = formik.errors
    let values = formik.values

    if (Object.keys(errors).length > 0 || values.email === "" ) {
      alert("Os dados devem ser preenchidos corretamente!");
      return;
    }
    
    // let file = values.avatar
    // let path = `images/${file.name}`
    
    // const email = values.email
    // const senha = values.senha
    // const nome = values.nome
    // const descricao = values.descricao
    // const link_site = values.link_site
    // const avatar = path
    // const uid = ""
    
    // let object = {
    //   email,
    //   nome,
    //   descricao,
    //   link_site,
    //   avatar,
    //   uid
    // }

    // FirebaseService.createUser(email, senha)
    // .then((user) => {
    //   object.uid = user.user.uid
    //   FirebaseService.storageFile(file, path)
    //   FirebaseService.pushData("usuarios", object)
    //   setTimeout(function(){
    //     window.location.replace(window.location.origin)
    //   }, 2000);
    //   return;
    // })
    // .catch((error) => {
    //     alert("Não foi possível cadastrar. Tente novamente.")
    //     return;
    // })

  }

  return (
      <>
      <h2 className="overview-title">Editar perfil</h2>
      <Form method="post" onSubmit={onSubmit}>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input type="text" name="email" id="email" placeholder="Digite seu email..." onChange={formik.handleChange} {...formik.getFieldProps("email")} />
          {formik.errors && <DisplayErrors msgError={formik.errors.email}/>}
        </FormGroup>
        <FormGroup>
          <Label for="senha">Senha:</Label>
          <Input type="password" name="senha" id="senha" placeholder="Digite uma senha..." onChange={formik.handleChange} {...formik.getFieldProps("senha")} />
          {formik.errors && <DisplayErrors msgError={formik.errors.senha}/>}
        </FormGroup>
        <FormGroup>
          <Label for="senha_confirmacao">Repita a Senha:</Label>
          <Input type="password" name="senha_confirmacao" id="senha_confirmacao" placeholder="Repita a senha..." onChange={formik.handleChange} {...formik.getFieldProps("senha_confirmacao")} />
          {formik.errors && <DisplayErrors msgError={formik.errors.senha_confirmacao}/>}
        </FormGroup>
        <FormGroup>
          <Label for="nome">Nome da Organização:</Label>
          <Input type="text" name="nome" id="nome" placeholder="Digite o nome da Organização..." onChange={formik.handleChange} {...formik.getFieldProps("nome")} />
          {formik.errors && <DisplayErrors msgError={formik.errors.nome}/>}
        </FormGroup>
        <FormGroup>
          <Label for="avatar">Logo da Organização:</Label>
          <CustomInput 
            type="file" 
            name="avatar" 
            id="avatar" 
            label="Selecione uma imagem" 
            onChange={(event) => {
              formik.values.avatar = ""
              if (typeof event.target.files[0] !== "undefined") {
                formik.values.avatar = event.target.files[0];
              }
            }} 
          />
          {formik.errors && <DisplayErrors msgError={formik.errors.avatar}/>}
        </FormGroup>
        <FormGroup>
          <Label for="descricao">Descrição:</Label>
          <Input type="textarea" name="descricao" id="descricao" placeholder="Faça uma descrição da Organização..." {...formik.getFieldProps("descricao")} />
          {formik.errors && <DisplayErrors msgError={formik.errors.descricao}/>}
        </FormGroup>
        <FormGroup>
          <Label for="link_site">Site da Organização:</Label>
          <Input type="text" name="link_site" id="link_site" placeholder="Link do site da Organização..." {...formik.getFieldProps("link_site")} />
          {formik.errors && <DisplayErrors msgError={formik.errors.link_site}/>}
        </FormGroup>
        <Button>Cadastrar</Button>
      </Form>
      </>
    );
  };
  
  export default UserEditForm;