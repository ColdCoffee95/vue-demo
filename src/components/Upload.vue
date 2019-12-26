<template>
  <div>
    <Upload
      :before-upload="handleUpload"
      :on-progress="onProgress"
      :on-error="onError"
      :on-success="onSuccess"
      action="http://oss-beta.xchanger.cn/api/formData"
    >123</Upload>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      file: null,
      uploadTimes: 0
    };
  },
  created() {
    console.log("123");
  },
  methods: {
    handleUpload(file) {
      this.file = file;
      this.upload();
      return false;
    },
    upload() {
      console.log("upload", this.file);
      this.uploadTimes++;
      let formData = new FormData();
      formData.append("file", this.file);
      axios({
        method: "post",
        timeout: 3000,
        url: "http://oss-beta.xchanger.cn/api/formData",
        data: formData,
        headers: {
          "content-type": "multipart/form-data"
        }
      })
        .then(res => {
          console.log("res", res);
        })
        .catch(e => {
          this.uploadTimes < 3 && this.upload();
          console.log("e", e);
        });
    }
  }
};
</script>