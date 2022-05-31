import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      // TODO REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
      required: "Arquivo obrigatório",
      validate:{ 
        lessThan10MB:(file: File) => file[0].size < 10000000 || "O arquivo deve ser menor que 10MB",
        acceptedFormats: (file: File) => (/image\/(gif|jpe?g|png)$/i).test(file[0].type) || "Somente são aceitos arquivos PNG, JPEG e GIF"
    }

    },
    title: {
      // TODO REQUIRED, MIN AND MAX LENGTH VALIDATIONS
      required: "Título obrigatório",
      validate:{
        minLength:  (title: string) => title.length >= 2 || `Mínimo de 2 caracteres`,
        maxLength:  (title: string) => title.length <= 20 ||`Máximo de 20 caracteres`
      }

    },
    description: {
      // TODO REQUIRED, MAX LENGTH VALIDATIONS
      required: "Descrição obrigatória",
      validate:{
        maxLength:  (description: string) => description.length <= 20 ||`Máximo de 20 caracteres`
      }
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    // TODO MUTATION API POST REQUEST,
      async (newImage: Record<string, unknown>) => {
        await api.post('api/images', newImage);
      } 
    ,{
      // TODO ONSUCCESS MUTATION
      onSuccess: () =>{
        queryClient.invalidateQueries()
      }
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger,
  } = useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      if(imageUrl){
      // TODO EXECUTE ASYNC MUTATION
        await mutation.mutateAsync({...data, url: imageUrl})
        // TODO SHOW SUCCESS TOAST
        toast({
          title: 'Imagem cadastrada',
          description: "Sua imagem foi cadastrada com sucesso.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })

      }else{
         toast({
          title: 'Imagem não adicionada',
          description: `É preciso adicionar e aguardar o upload de uma imagem 
            antes de realizar o cadastro.`,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        return;
      }
    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
      toast({
        title: 'Falha no cadastro',
        description: "Ocorreu um erro ao tentar cadastrar a sua imagem.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
      reset();
      setImageUrl('');
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          // TODO SEND IMAGE ERRORS
          error={errors.image}
          // TODO REGISTER IMAGE INPUT WITH VALIDATIONS
          onChange= {() => {}}
          {...register("image", formValidations.image)}
        />

        <TextInput
          placeholder="Título da imagem..."
          // TODO SEND TITLE ERRORS
          error={errors.title}
          // TODO REGISTER TITLE INPUT WITH VALIDATIONS
          {...register("title",formValidations.title)}

        />

        <TextInput
          placeholder="Descrição da imagem..."
          // TODO SEND DESCRIPTION ERRORS
          error={errors.description}
          // TODO REGISTER DESCRIPTION INPUT WITH VALIDATIONS
          {...register("description", formValidations.description)}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
