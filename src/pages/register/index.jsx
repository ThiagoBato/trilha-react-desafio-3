import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdEmail, MdLock, MdNaturePeople } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { Container, Title, Column, TitleLogin, SubtitleLogin, CriarText, Row, Wrapper } from './styles';

const Register = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm({
    reValidateMode: 'onChange',
    mode: 'onSubmit',
  });

  const onSubmit = async (formData) => {
    try {
      const { data } = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);
      if (data.length && data[0].id) {
        navigate('/feed');
        return;
      }
      alert('Usuário ou senha inválido');
    } catch (e) {
      console.error("Erro ao fazer a requisição", e);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Column>
          <Title>
            A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.
          </Title>
        </Column>
        <Column>
          <Wrapper>
            <TitleLogin>Comece agora grátis</TitleLogin>
            <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input 
                placeholder="Nome Completo" 
                leftIcon={<MdNaturePeople />} 
                name="nome" 
                control={control} 
                rules={{ required: "Nome é obrigatório" }}
              />
              {errors.nome && <span>{errors.nome.message}</span>}

              <Input 
                placeholder="E-mail" 
                leftIcon={<MdEmail />} 
                name="email" 
                control={control} 
                rules={{ required: "E-mail é obrigatório" }}
              />
              {errors.email && <span>{errors.email.message}</span>}

              <Input 
                type="password" 
                placeholder="Senha" 
                leftIcon={<MdLock />}  
                name="senha" 
                control={control} 
                rules={{ required: "Senha é obrigatória" }}
              />
              {errors.senha && <span>{errors.senha.message}</span>}

              <Button title="Entrar" variant="secondary" type="submit" />
            </form>

            <SubtitleLogin>
              Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.
            </SubtitleLogin>
            <Row>
              Já tenho conta.<CriarText>Fazer login</CriarText>
            </Row>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
};

export { Register };