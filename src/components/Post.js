import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import '../history.css'; // Import CSS

// Create a single Supabase client for interacting with your database
const supabaseUrl = 'https://ejpvfjopqsiuqemfybgx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcHZmam9wcXNpdXFlbWZ5Ymd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NjcxNDMsImV4cCI6MjAzMjA0MzE0M30.RQPWLIOGYc-ycGm2KHz3P0nnMfnh-hIsTT6CWCV4_xk'
const supabase = createClient(supabaseUrl, supabaseKey);


function Post({ movie_id, onNewPost }) {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const { data, error } = await supabase
        .from('history')
        .insert([{ movie_id, user_id: username, message }]);
  
      if (error) {
        console.error('Error inserting data:', error);
        return;
      }
  
      if (data && data.length > 0) {
        onNewPost(data[0]);
      } else {
        console.warn('No data returned from insert operation');
      }
  
      setUsername('');
      setMessage('');
    };
  
    return (
      <div className="post-box">
        <h3>What do you think about this movie?</h3>
        <form id="post-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <textarea
            id="message"
            name="message"
            rows="3"
            placeholder="What's happening?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit">Post</button>
        </form>
      </div>
    );
  }
  
  export default Post;