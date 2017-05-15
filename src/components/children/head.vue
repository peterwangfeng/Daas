<template>
  <div class="header">
    <nav class="nav">
      <div class="nav-left">
        <img src="../../assets/logo.png">
        <span class="title">数据服务云管理平台</span>
      </div>
      <div class="nav-right">
        <ol>
          <li>用户：{{subject.name}}</li>
          <li>|</li>
          <li @click="openNoticeCenter">
          <span>
            <el-button type="text">通知</el-button>
            <!-- <el-badge is-dot class="item">
            </el-badge> -->
            <div class="es-badge"></div>
          </span>
          </li>
          <li>|</li>
          <li>
            <el-button type="text" @click="logout">退出</el-button>
          </li>
        </ol>
      </div>
    </nav>
  </div>
</template>

<script>
  import URL from '../../api/url';
  import bus from '../../api/bus';
  import router from '../../router/index';

  export default {
    name: 'heads',
    data () {
      return {
        subject: {
          id: 0,
          name: ''
        },
        noticeNumber: 0
      };
    },
    created () {
      let self = this;
      let subject = self.subject;
      let subjectString = window.sessionStorage.getItem('subject');
      if (subjectString) {
        let subjectObject = JSON.parse(subjectString);
        subject.id = subjectObject.id;
        subject.name = subjectObject.name;
        this.init();
      }
    },
    methods: {
      urlPartReplace(url, origin, dest) {
        return String(url).replace(origin, dest);
      },
      init() {
        let self = this;
        let subjectId = self.subject.id;
        let url = self.urlPartReplace(URL.GET_NOTIFICATIONS_URL, '{subject_id}', subjectId);
        let params = {cur_page: 1, page_size: 10, check_status: 0};
        self.$http.get(url, {params: params}, {
          emulateJSON: true
        }).then(function (response) {
          let target = response.data;
          if (target.code === 100) {
            let data = target.data;
            if (data) {
              let notices = data.notice_list;
              self.noticeNumber = notices.length;
            }
          }
        }, function (response) {
        });
      },
      logout() {
        let self = this;
        let subjectId = self.subject.id;
        if (subjectId > 0) {
          let url = self.urlPartReplace(URL.LOGOUT_URL, '{subject_id}', subjectId);
          this.$http.delete(url).then(function (response) {
            let target = response.data;
            if (target.code === 100) {
              window.sessionStorage.clear();
            }
          }, function (response) {
          });
        }
        router.push({path: '/platform'});
      },
      openNoticeCenter() {
        bus.$emit('notice', '/notice');
        router.push({path: '/notice'});
      }
    }
  };
</script>

<style lang="scss" scoped>
  .header {
    height: 50px;
    width: 100%;
    position: fixed;
    z-index: 2000;
    line-height: 50px;
    div {
      float: left;
    }
    .nav {
      height: 50px;
    }
    .nav-left {
      img {
        vertical-align: middle;
      }
      span.title {
        color: #C5C7CA;
        font-weight: 200;
        position: relative;
        vertical-align: middle;
        top: 2px;
      }
    }
    .nav-right {
      height: 50px;
      float: right;
      ol {
        color: #fff;
        height: 50px;
        list-style: none;
        margin: 0;
        li {
          display: inline-block;
          margin: 0 2px;
          span {
            margin: 0 2px 0 0;
          }
        }
        li:last-child {
          margin: 0 40px 0 0;
        }
        li:nth-child(3) {
          span {
            div {
              position: absolute;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: red;
              top: 13px;
              right: 81px;
            }
          }
        }
      }
    }
  }
</style>

