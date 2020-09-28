<template>
  <div class="about">
    <div class="container">
      <div class="modal-content text-center">
        <div class="modal-header">
          <h4 class="modal-title" style="margin: 0 auto">
            <strong>{{$t("about.title")}}</strong>
<!--            <span style="color:crimson">{{$t("about.title")}}</span>-->
          </h4>
        </div>
          <div class="modal-body">
            视质量为企业生命，狠抓产品质量，以最大可能为客户做到最好！公司自主生产、加工、销售的各种产品，满足客户对产品的需求和各种要求。
              我们深信，别人做不到的，我们能做到；别人做得到的，我们将会做得更好。</div>
        </div>
        <div class="more_information">
            <div class="row font">
                <div class="col">
                    {{$t("about.address")}}
                </div>
                <div class="col">
                    {{$t("about.phone")}}
                </div>
                <div class="col">
                    {{$t("about.website")}}
                </div>
            </div>
            <div class="row font">
                <div class="col">
                    {{$t("about.fax")}}
                </div>
                <div class="col">
                    {{$t("about.email")}}
                </div>
                <div class="col">

                </div>
            </div>
    </div>
    </div>
<!--          <img-->
<!--            src="https://avatars1.githubusercontent.com/u/17190913?s=460&v=4"-->
<!--            name="aboutme"-->
<!--            width="140"-->
<!--            height="140"-->
<!--            border="0"-->
<!--            class="avatar"-->
<!--          >-->
<!--          <h3 class="media-heading">Mohammed Ismail</h3>-->
<!--          <h6>-->
<!--            <strong>ikismail7@gmail.com</strong>-->
<!--          </h6>-->
<!--          <h6>-->
<!--            <a href="https://ikismail.github.io/" target="_blank">ikismail.github.io</a>-->
<!--            <strong></strong>-->
<!--          </h6>-->

<!--          <span class="badge badge-warning p-2 m-1">Angular</span>-->
<!--          <span class="badge badge-primary p-2 m-1">Vuejs</span>-->
<!--          <span class="badge badge-secondary p-2 m-1">React</span>-->
<!--          <span class="badge badge-success p-2 m-1">Github</span>-->
<!--          <span class="badge badge-danger p-2 m-1">RestService</span>-->
          <!-- <hr> -->
          <!-- <p class="text-left">
            <strong>Bio:</strong>
            <br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem dui, tempor sit amet commodo a, vulputate vel tellus.
          </p>
          <br>-->

        <!-- <div class="modal-footer" style="margin: 0 auto">
          <button type="button" class="btn btn-default" data-dismiss="modal">Read More</button>
        </div>-->
  </div>
</template>
<style>
.avatar {
  border-radius: 10px;
}
    .about .font{
        font-size: 14px;
        text-align:left;
    }

    .about .more_information{
      line-height: 2;
    }
</style>
