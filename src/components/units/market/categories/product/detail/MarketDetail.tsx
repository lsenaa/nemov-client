import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { GlobalWrapper } from "../../../../../../commons/styles/globalStyles";
import { UseQueryFetchProduct } from "../../../../../commons/hooks/useQueries/product/UseQueryFetchProduct";
import MarketDetailBody from "./body/MarketDetailBody";
import MarketDetailHead from "./head/MarketDetailHead";

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function MarketDetail() {
  const router = useRouter();
  const { query } = UseQueryFetchProduct({ productId: String(router.query.productId) });
  console.log("부모 컴포넌트가 랜더링됩니다.");

  return (
    <GlobalWrapper>
      <InnerWrapper>
        <MarketDetailHead data={query} />
        <MarketDetailBody data={query} />
      </InnerWrapper>
    </GlobalWrapper>
  );
}