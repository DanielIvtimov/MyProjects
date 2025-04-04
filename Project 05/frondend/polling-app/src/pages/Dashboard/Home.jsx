import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import useUserAuth from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom';
import "./styles/Home.css";
import HeaderWithFilter from '../../components/layout/HeaderWithFilter';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import PollCard from '../../components/PollCards/PollCard';

const PAGE_SIZE = 5; 

const Home = () => {

  useUserAuth();  

  const navigate = useNavigate();

  const [allPolls, setAllPolls] = useState([]);
  const [stats, setStats] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [filterType, setFilterType] = useState("");

  const fetchAllPolls = async (overridePage = page) => {
    if(loading) return;
    setLoading(true);
    try{
      const response = await axiosInstance.get(`${API_PATHS.POLLS.GET_ALL}?page=${overridePage}&limit=${PAGE_SIZE}&type=${filterType}`);
      if(response.data?.polls?.length > 0){
        setAllPolls((prevPolls) => overridePage === 1 ? response.data.polls : [...prevPolls, ...response.data.polls]);
        setStats(response.data?.stats || []);
        setHasMore(response.data.polls.length === PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    }catch(error){
      console.log("Something went wrong. Please try again.", error);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    setPage(1);
    fetchAllPolls(1);
    return () => {};
  }, [filterType]);

  useEffect(() => {
    if(page !== 1){
      fetchAllPolls();
    }
    return () => {};
  }, [page]);

  return (
    <DashboardLayout activeMenu="dashboard">
      <div className='header'>
        <HeaderWithFilter title="Polls" filterType={filterType} setFilterType={setFilterType} />
      </div>
      {allPolls.map((poll) => (
        <PollCard 
        key={`dashboard_${poll._id}`}
        pollId={poll._id} 
        question={poll.question} 
        type={poll.type} 
        options={poll.options} 
        voters={poll.voters || 0} 
        responses={poll.responses || []} 
        creatorProfileImg={poll.creator.profileImageUrl || null} 
        creatorName={poll.creator.fullName} 
        creatorUsername={poll.creator.username}
        userHasVoted={poll.userHasVoted || false}
        isPollClosed={poll.closed || false}
        createdAt={poll.createdAt || false}
        />
      ))}
    </DashboardLayout>
  )
  
}

export default Home