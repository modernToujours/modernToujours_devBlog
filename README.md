# **modernToujours.dev**

<br>

## 👋 **Overview**

- [개요](#개요)
- [사용 기술 및 라이브러리](#사용-기술-및-라이브러리)
- [간단 기능 소개](#간단-기능-소개)
- [배포](#배포)

<br>

## **개요**

<br>

제 개인 블로그를 제작하기 위해 진행한 프로젝트 입니다.

**기획 및 제작 :** 최영원

**제작 기간 :** 2022-10-24 ~ 

<br>

<img iwdth="100%" alt="블로그 메인 페이지" src="https://forus-s3.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/blog/%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3+%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AB+%E1%84%91%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%8C%E1%85%B5.png"/>

배포 사이트는 [portfolio.moderntoujours.dev](http://www.moderntoujours.dev) 를 통해 확인하실 수 있습니다.

<br>

## **사용 기술 및 라이브러리**

<br>

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![AWS-S3](https://img.shields.io/badge/S3-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![AWS-ROUTE53](https://img.shields.io/badge/ROUTE53-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

<br>

## 간단 기능 소개

<br>

- [NextAuth.js](https://next-auth.js.org/)를 이용해 이메일 로그인 및 회원가입, 그리고 깃허브와 구글 로그인 API를 사용하여 소셜 로그인 기능을 구현하였습니다.
- 제 계정에 한하여 글 작성, 수정 및 삭제가 가능하도록 하였고, 에디터는 [tui-editor](https://ui.toast.com/tui-editor)를 사용하였습니다. 작성 글(markdown 파일) 및 이미지 업로드의 경우 [next-s3-upload]((https://next-s3-upload.codingvalue.com/)를 사용해 s3에 업로드하도록 하였습니다.
- 글 조회의 경우 [tui-editor](https://ui.toast.com/tui-editor)의 Viewer가 ssr을 지원하지 않아 (알아볼 당시 기준) [react-markdown](https://github.com/remarkjs/react-markdown)을 사용하였습니다.
- 서버 상태 관리를 위해 [react-query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/)를 사용하였습니다.
- [MUI](https://mui.com/)를 사용해 다크/라이트 모드 기능을 만들었습니다.(기능은 정상 동작 중이지만 라이트 모드는 거의 신경쓰지 않은 상태라 미적으로 문제가 있을 확률이 큽니다. 수정예정)
- 프론트 부분만이 아니라 백엔드 부분도 [Next.js](https://nextjs.org/)를 사용하였습니다. DB는 [MongoDB Atlas](https://www.mongodb.com/atlas)를 사용하였습니다.



<br>

## 배포

<br>

- [Vercel](https://vercel.com/)을 통해서 배포중 입니다.
- 도메인은 [가비아](https://www.gabia.com/)에서 구입하고 [Route53](https://aws.amazon.com/ko/route53/)에서 호스팅 중 입니다.
