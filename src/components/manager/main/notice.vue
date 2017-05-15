<template>
  <div class="es-notice">
    <div class="container-fluid">
      <h4>通知中心</h4>
      <div class="row">
        <div class="col-md-12">
          <div class="notice-content">
            <el-card class="box-card" v-loading="loading" element-loading-text="拼命加载中">
              <el-collapse @change="changeNoticeStatus" accordion>
                <el-collapse-item v-for="notice in notices" :key="notice" :name="notice.id" class="collapse-item">
                  <template slot="title">
                    <span :class="{read: notice.isRead}">{{notice.title}}</span>
                    <i class="header-icon el-icon-information"></i>
                    <span :class="{read: notice.isRead}">{{notice.time}}</span>
                  </template>
                  <div v-html="notice.content"></div>
                </el-collapse-item>
              </el-collapse>
              <es-pagination :total="total" v-on:currentPage="next"></es-pagination>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import URL from '../../../api/url';
  import EsPagination from '../../children/pagination';

  export default {
    components: {
      EsPagination
    },
    data() {
      return {
        loading: true,
        total: 1,
        notices: []
      };
    },
    created() {
      let subjectString = window.sessionStorage.getItem('subject');
      if (subjectString) {
        let subjectObject = JSON.parse(subjectString);
        this.subjectId = subjectObject.id;
        this.init();
      }
    },
    methods: {
      urlPartReplace(url, origin, dest) {
        return String(url).replace(origin, dest);
      },
      dateFormat(row) {
        let date = new Date(row.time);
        return date.toLocaleString();
      },
      init(currentPage = 1) {
        let self = this;
        let notices = [];
        let subjectId = self.subjectId;
        let url = self.urlPartReplace(URL.GET_NOTIFICATIONS_URL, '{subject_id}', subjectId);
        let params = {cur_page: currentPage, page_size: 10};
        self.$http.get(url, {params: params}).then(function (response) {
          let target = response.data;
          self.loading = false;
          console.log(response);
          if (target.code === 100) {
            let data = target.data;
            if (data) {
              self.total = data.total;
              let notice_list = data.notice_list;
              notice_list.map((notice) => {
                let temp = {
                  id: notice.id,
                  title: notice.title,
                  isRead: false,
                  content: notice.content,
                  time: notice.notice_time,
                  status: notice.check_status
                };
                notices.push(temp);
                self.notices = notices;
              });
            }
          }
        }, function (response) {
          self.loading = false;
        });
      },
      changeNoticeStatus(activeName) {
        if (!activeName) {
          return;
        }
        let nota = null;
        this.notices.forEach((notice) => {
          if (notice) {
            if (String(notice.id) === activeName) {
              nota = notice;
            }
          }
        });
        let subjectId = this.subjectId;
        let url = this.urlPartReplace(URL.UPDATE_NOTIFICATIONS_URL, '{subject_id}', subjectId);
        let data = {
          notification_id: activeName + '',
          check_status: 1 + ''
        };
        data = JSON.stringify(data);
        this.$http.post(url, data, {
          emulateJSON: true
        }).then((res) => {
          if (res.body.code === 100) {
            nota.isRead = true;
            window.console.log(res.body.msg);
          }
        }).catch((err) => {
          window.console.log(err);
        });
      },
      next(currentPage) {
        this.init(currentPage);
      },
      statusFormat(row) {
        let status = Number(row.status);
        let result = status === 0 ? '未读' : '已读';
        return result;
      }
    }
  };
</script>

<style scoped lang="scss">
  .es-notice {
    padding: 20px;
    .notice-content {
      background-color: #fff;
      .text {
        height: 20px;
        margin: 0 0 10px 0;
        background-color: red;
      }
      .el-collapse {
        border: none;

        .collapse-item {
          .el-collapse-item__header {
            .read {
              color: #4db3ff;
            }
            span:last-child {
              position: absolute;
              right: 60px;
            }
          }
          .read {
            color: #4db3ff;
          }
        }
      }
    }
  }
</style>
