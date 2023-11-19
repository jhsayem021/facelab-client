import React, { useContext } from 'react';

import AllFeed from '../AllFeed/AllFeed';
import { AuthContext } from '../../../providers/AuthProvider';
const HomeMiddle = () => {
    const { user , loading } = useContext(AuthContext);
    return (
        <div className='p-5 lg:p-0'>
          {
             user && <AllFeed
             user = {user}
             loading = {loading}
             ></AllFeed>
          }
        </div>
    );
};

export default HomeMiddle;