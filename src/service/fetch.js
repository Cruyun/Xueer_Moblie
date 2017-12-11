function Fetch(url, opt = {}) { 
    
     // 设置请求方法
     opt.method = opt.method || 'GET';
    
     // 处理要发送的数据
     if (opt.data) {
        if (/GET/i.test(opt.method)) {
          url = `${url}&${obj2query(opt.data)}`;
        } else {
          opt.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          };
          opt.body = JSON.stringify(opt.data);
        }
      }
    
      return fetch(url, opt)
        .then(response => {  
          return response.json();
        })
    }