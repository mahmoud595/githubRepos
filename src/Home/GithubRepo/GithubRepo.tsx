import styled from "styled-components";
import { getdaysFromCertainDate } from "../../utils/helperFunctions";
import {Repo} from "../../utils/types/githubReposTypes"
const Container = styled.div`
  display: flex;
  padding: 10px;
  margin: 30px 0;
  border-radius: 5px;
`;
const Avatar = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 50%;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    margin-top: 10px;
  }
`;

const RepoName = styled.h2`
  margin: 0;
  text-transform: capitalize;
`;
const RepoDescription = styled.p`
  margin: 10px 0 0 0;
  font-size: 18px;
`;
const NumbersDetails = styled.div`
  display: flex;
  align-items: center;
`;
const RepoStars = styled.div`
  padding: 5px;
  border: 1px solid black;
  background: #e4d96f  ;
  border-radius: 5px;
  color:#fff

`;
const RepoIssues = styled.div`
  padding: 5px;
  border: 1px solid black;
  margin-left: 10px;
  background: #ff0800;
  border-radius: 5px;
  color:#fff
`;
const Title = styled.span`
  font-weight: bold;
`;
const Submitted = styled.p`
  margin: 0 0 0 5px;
`;
const OwnerName = styled.span`
  color: red;
  font-weight: bold;
  text-transform: capitalize;
`;

interface Props {
  repo:Repo
}
export const GithubRepo = (props:Props):JSX.Element => {
  const {repo} = props
  return (
    <Container>
      <Avatar src={repo?.owner?.avatar_url} alt={repo?.owner?.login}></Avatar>
      <Details>
        <RepoName>{repo?.name}</RepoName>
        <RepoDescription>{repo?.description}</RepoDescription>
        <NumbersDetails>
          <RepoStars>
            <Title>Stars </Title>: {repo?.stargazers_count}
          </RepoStars>
          <RepoIssues>
            <Title>Issues </Title>: {repo?.open_issues_count}
          </RepoIssues>
          <Submitted>
            Submitted {getdaysFromCertainDate(repo?.created_at)} days ago by{" "}
            <OwnerName> {repo?.owner?.login}</OwnerName>
          </Submitted>
        </NumbersDetails>
      </Details>
    </Container>
  );
};
