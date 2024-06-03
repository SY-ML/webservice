import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import '../history.css'; // Import CSS

// Create a single Supabase client for interacting with your database
const supabaseUrl = 'https://ejpvfjopqsiuqemfybgx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcHZmam9wcXNpdXFlbWZ5Ymd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NjcxNDMsImV4cCI6MjAzMjA0MzE0M30.RQPWLIOGYc-ycGm2KHz3P0nnMfnh-hIsTT6CWCV4_xk'
const supabase = createClient(supabaseUrl, supabaseKey);
function Load({ movie_id }) {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      const refreshHistory = async () => {
        const { data, error } = await supabase
          .from('history')
          .select('*')
          .eq('movie_id', movie_id); // Ensure movie_id is passed as a number
  
        if (error) {
          console.error('Error fetching data:', error);
          return;
        }
  
        setPosts(data);
      };
  
      refreshHistory();
    }, [movie_id]);
  
    return (
      <div className="posts">
        <h3>Reviews</h3>
        <div id="post-list">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <div className="username">{post.user_id}</div>
              <div className="message">{post.message}</div>
              <div className="timestamp">{new Date(post.created_at).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Load;