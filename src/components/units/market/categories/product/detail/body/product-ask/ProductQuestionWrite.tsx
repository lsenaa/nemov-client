import React from "react";
import { useForm } from "react-hook-form";
import { SetterOrUpdater } from "recoil";
import { StyledCommonButton02 } from "../../../../../../../commons/buttons/CommonButtons.styles";
import {
  IFormQuestionData,
  UseMutationCreateQuestion,
} from "../../../../../../../commons/hooks/useMutations/question/UseMutationCreateQuestion";
import * as S from "./ProductAsk.styles";
import { Modal } from "antd";

interface IProductQuestionWriteProps {
  setIsOpen: SetterOrUpdater<boolean>;
}

export default function ProductQuestionWrite(props: IProductQuestionWriteProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,

    formState: { isSubmitSuccessful },
  } = useForm<IFormQuestionData>({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      contents: "",
    },
    shouldUseNativeValidation: true,
  });
  const { createQuestionSubmit } = UseMutationCreateQuestion();

  const onSubmitQuestion = async (data: IFormQuestionData) => {
    if (data === undefined) return;
    try {
      watch(["title", "contents"]);
      const result = await createQuestionSubmit(data);
      console.log(result);
      console.log(isSubmitSuccessful);
      if (!isSubmitSuccessful) {
        props.setIsOpen((prev) => !prev);
      }
      reset({ ...data });
      Modal.success({ content: "문의 등록이 완료되었습니다." });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      Modal.error({ content: "문의가 성공적으로 등록되지 않았습니다." });
    }
  };

  return (
    <S.QuestionWriteInnerWrapper>
      <S.QuestionWriteHeader>상품 문의하기</S.QuestionWriteHeader>
      <S.QuestionWriteForm onSubmit={handleSubmit(onSubmitQuestion)}>
        <S.ProductName>상품 이름</S.ProductName>
        <S.QuestionTitle
          {...register("title", { required: "제목을 입력해주세요.", minLength: 2 })}
          {...watch(["title"])}
          placeholder="제목을 입력해주세요."
        />
        <S.QuestionDetail
          {...register("contents", { required: "내용을 입력해주세요.", maxLength: 100 })}
          {...watch(["contents"])}
          placeholder="내용을 입력해주세요."
        />
        <S.QuestionButtonWrapper02>
          <StyledCommonButton02 type="submit" style={{ width: "8rem", height: "3.3rem" }}>
            문의 등록하기
          </StyledCommonButton02>
        </S.QuestionButtonWrapper02>
      </S.QuestionWriteForm>
    </S.QuestionWriteInnerWrapper>
  );
}