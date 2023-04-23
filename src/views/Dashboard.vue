<template>
  <v-app
    :class="[
      $vuetify.theme.dark ? 'backgorundpic_dark' : 'backgorundpic_light',
    ]"
  >
    <!-- <particles></particles> -->
    <Header
      v-if="!cardLoading"
      :addressShow="addressShow"
      :aliceBalance="muonTestTokenShow"
      :connectWallet="connectToMetamask"
      :switchNetwork="switchToCorrectChain"
      :isCorrectChain="isCorrectChain"
      :isConnected="isConnected"
    ></Header>

    <v-main class="">
      <h2 v-if="this.haveNode === 'error'" class="text-center mt-5">
        something went wrong. please try again later.
      </h2>

      <v-responsive v-if="cardLoading" height="80vh">
        <v-row justify="center" style="height: 100%">
          <v-col align-self="center"></v-col>
          <lottie-vue-player
            ref="anim"
            src="https://lottie.host/1fb3a319-394b-446d-8fce-824aa4f1787c/xjtL4nMuB2.json"
            :autoplay="true"
            :loop="true"
            height="200px"
            class="transparent"
          />
        </v-row>
      </v-responsive>
      <v-responsive
        v-else-if="haveNode != 'error'"
        width="100%"
        class="px-5 overflow-visible"
      >
        <v-row
          v-if="e1 < steps.newNode || e1 === steps.newNode"
          class=""
          justify="center"
        >
          <v-col
            md="4"
            class="text-center d-flex justify-center"
            justify-center
          >
            <div class="d-flex justify-center title_card">
              <div class="title_card_box text-center pt-2 mt-1">
                <h2 class="title_card_box_font font-weight-600">
                  Adding a Node
                </h2>
                <h3 class="subtitle_card_box_font">To the ALICE Network</h3>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row v-if="e1 <= steps.addNode" justify="center" class="mt-10">
          <v-col md="5" xl="3">
            <v-row>
              <v-col md="3" class="text-center">
                <div
                  :class="[
                    'center_margin_auto',
                    'steps_title',
                    'setp_box',
                    'height-step-box',
                    'text-center',
                    'py-3',
                    'primaryOrange',
                    'white--text',
                  ]"
                >
                  Step 1
                </div>
                <div class="d-flex justify-center">
                  <div
                    :class="[
                      'height-steps',
                      e1 > steps.mint ? 'divider_step_box' : 'border-dashed',
                    ]"
                  ></div>
                </div>
                <div
                  :class="[
                    'center_margin_auto',
                    'steps_title',
                    'setp_box',
                    'height-step-box',
                    'text-center',
                    'py-3',
                    e1 > steps.mint
                      ? 'primaryOrange white--text'
                      : 'step_deactive',
                  ]"
                  width="100%"
                >
                  Step 2
                </div>
                <div class="d-flex justify-center">
                  <div
                    :class="[
                      'height-steps',
                      e1 > steps.approve ? 'divider_step_box' : 'border-dashed',
                    ]"
                  ></div>
                </div>
                <div
                  :class="[
                    'center_margin_auto',
                    'steps_title',
                    'setp_box',
                    'height-step-box',
                    'text-center',
                    'py-3',
                    e1 > steps.approve
                      ? 'primaryOrange white--text'
                      : 'step_deactive',
                  ]"
                  width="100%"
                >
                  Step 3
                </div>
              </v-col>
              <v-col>
                <div class="">
                  <h4
                    :class="[
                      'steps_title',
                      { steps_title_active: e1 === steps.mint },
                    ]"
                  >
                    Mint 1000 Alice Tokens
                  </h4>
                  <h5 class="steps_sub_title">to your wallet</h5>
                </div>
                <div class="height-steps"></div>
                <div class="">
                  <h4
                    :class="[
                      'steps_title',
                      { steps_title_active: e1 == steps.approve },
                    ]"
                  >
                    Approve the Staking Contract
                  </h4>
                  <h5 class="steps_sub_title">
                    to be able to deposit your tokens
                  </h5>
                </div>
                <div class="height-steps"></div>
                <div class="">
                  <h4
                    :class="[
                      'steps_title',
                      { steps_title_active: e1 == steps.addNode },
                    ]"
                  >
                    Add your Node to the Network
                  </h4>
                  <h5 class="steps_sub_title">
                    and start securing the network!
                  </h5>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col md="4" xl="3">
            <v-expand-transition>
              <v-card
                width="423"
                elevation="0"
                class="px-2 rounded-lg input-card-min-height pb-4 pt-6"
              >
                <v-container class="full-height">
                  <v-row class="input-card-min-height d-flex">
                    <v-col v-if="e1 === steps.mint" cols="12">
                      <div class="mint-level">
                        <div
                          v-if="!haveEnoughTokenTEst"
                          class="lightPrimaryOrange rounded-sm px-2"
                        >
                          <v-row>
                            <v-col cols="2">
                              <v-icon color="primaryOrange" class="text-h3">
                                mdi-alert-circle
                              </v-icon>
                            </v-col>
                            <v-col>
                              <p class="mb-0 font-weight-medium text-body-2">
                                You don't have enough tokens. You need at least
                                <b> 1000 ALICE</b>
                              </p>
                            </v-col>
                          </v-row>
                        </div>
                        <p class="mt-5 font-weight-regular">
                          Your <b>ALICE</b> token balance:
                          <b>{{ muonTestTokenShow }}</b>
                          <v-btn
                            @click="getTokenTestBalance"
                            class="ml-2 rounded-sm"
                            icon
                            color="success"
                          >
                            <v-icon color="black" class="gray rounded-sm"
                              >mdi-refresh</v-icon
                            >
                          </v-btn>
                        </p>
                        <p class="mt-10">Token amount (min: 1000)</p>
                        <v-text-field
                          solo
                          flat
                          :disabled="!isConnected || !isCorrectChain"
                          v-model="mintAmount"
                          :rules="minMint"
                          height="56px"
                          class="rounded-md"
                          name="name"
                          label="Enter Amount you wish to mint"
                          id="id"
                          background-color="gray"
                        ></v-text-field>
                        <v-row
                          v-if="isConnected && isCorrectChain"
                          class="pr-3"
                        >
                          <v-col cols="10">
                            <v-btn
                              block
                              large
                              :loading="btnLoading"
                              :disabled="mintAmount > 1000 || mintAmount < 1"
                              @click="mint"
                              color="primary"
                              elevation="0"
                              class="text-capitalize font-weight-600 text-h6 py-7"
                              >Mint ALICE</v-btn
                            >
                          </v-col>
                          <v-col cols="2" class="pl-0">
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  v-bind="attrs"
                                  v-on="on"
                                  @click="($event) => (e1 = steps.approve)"
                                  block
                                  large
                                  color="gray"
                                  elevation="0"
                                  class="py-7"
                                  :disabled="!haveEnoughTokenTEst"
                                >
                                  <v-img
                                    :class="{
                                      'gray-filter': !haveEnoughTokenTEst,
                                    }"
                                    src="@/assets/card/right-flash.svg"
                                  ></v-img>
                                </v-btn>
                              </template>
                              <span>Next Step</span>
                            </v-tooltip>
                          </v-col>
                        </v-row>
                        <v-row v-else>
                          <v-col>
                            <v-btn
                              v-if="!isCorrectChain"
                              @click="switchToCorrectChain"
                              block
                              large
                              color="primary"
                              >switch network</v-btn
                            >
                            <v-btn
                              v-else
                              @click="connectToMetamask"
                              block
                              large
                              color="primary"
                              >connect wallet</v-btn
                            >
                          </v-col>
                        </v-row>
                      </div>
                    </v-col>
                    <v-col
                      v-if="e1 === steps.approve"
                      align-self="end"
                      cols="12"
                    >
                      <div class="">
                        <lottie-vue-player
                          ref="anim"
                          src="https://lottie.host/868900ff-6aee-4393-a1e8-b60ad88620b1/T2cHITcdet.json"
                          :autoplay="true"
                        />
                        <p
                          class="text-center mb-10 font-weight-medium text-subtitle-1"
                        >
                          Now you need to approve the <br />
                          staking contract to use the tokens
                        </p>
                        <v-row>
                          <v-col cols="9"
                            ><v-btn
                              :loading="btnLoading"
                              @click="approve"
                              elevation="0"
                              block
                              large
                              color="primary"
                              >Approve</v-btn
                            ></v-col
                          >
                          <v-col cols="3" class="pl-0"
                            ><v-btn
                              @click="checkApproved"
                              block
                              large
                              class="rounded-md"
                              color="gray"
                              elevation="0"
                            >
                              <v-icon color="black" class="gray rounded-md">
                                mdi-refresh
                              </v-icon>
                            </v-btn></v-col
                          >
                        </v-row>
                      </div>
                    </v-col>
                    <v-col v-if="e1 === steps.addNode" cols="12">
                      <div class="lightInfo rounded-sm px-1">
                        <v-row>
                          <v-col align-self="center" cols="2">
                            <v-icon color="info" class="text-h3">
                              mdi-alert-box
                            </v-icon>
                          </v-col>
                          <v-col align-self="center" class="pl-1">
                            <p class="text-body-2 font-weight-medium">
                              While adding your node. you will <br />
                              automatically stake 1000 ALICE tokens
                            </p>
                          </v-col>
                        </v-row>
                      </div>
                      <v-row>
                        <v-col cols="12" class="mt-15">
                          <span>Node IP</span>
                          <v-text-field
                            v-model="nodeIPInput"
                            @input="getNodeAddressPeerIdByIP(nodeIPInput)"
                            solo
                            flat
                            height="56px"
                            class="rounded-md"
                            name="name"
                            label="Enter your node IP"
                            id="id"
                            background-color="gray"
                          ></v-text-field>
                          <v-row justify="center" v-if="ipCheckLoading">
                            <v-col cols="8">
                              <lottie-vue-player
                                ref="anim"
                                src="https://lottie.host/1fb3a319-394b-446d-8fce-824aa4f1787c/xjtL4nMuB2.json"
                                :autoplay="true"
                                :loop="true"
                                height="100px"
                                class="transparent"
                              />
                            </v-col>
                          </v-row>
                          <div v-else-if="nodeIpStatus === 'success'">
                            <v-alert type="success" :value="true">
                              Node address: {{ addressToShort(nodeAddress) }}
                              <br />
                              Peer Id: {{ addressToShort(peerId) }}
                            </v-alert>
                          </div>
                          <div v-else-if="nodeIpStatus === 'info'">
                            <v-alert
                              type="info"
                              :value="true"
                              class="text-caption"
                            >
                              This node has already been added to this IP.
                              <br />
                              Staker address:
                              {{ addressToShort(stakerAddress) }}
                            </v-alert>
                          </div>
                          <div v-else-if="nodeIpStatus === 'error'">
                            <v-alert type="error" :value="true">
                              the node is not reachable</v-alert
                            >
                          </div>
                        </v-col>
                      </v-row>
                      <v-row class="mt-8">
                        <v-col cols="2">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                v-bind="attrs"
                                v-on="on"
                                @click="($event) => (e1 = steps.mint)"
                                block
                                large
                                color="gray"
                                class="py-7"
                                elevation="0"
                              >
                                <v-img
                                  src="@/assets/card/left-flash.svg"
                                ></v-img>
                              </v-btn>
                            </template>
                            <span>Back to mint</span>
                          </v-tooltip>
                        </v-col>
                        <v-col cols="10" class="pl-6">
                          <v-btn
                            :disabled="nodeIpStatus != 'success'"
                            @click="addNode"
                            :loading="btnLoading"
                            elevation="0"
                            block
                            large
                            color="primary"
                            class="text-capitalize font-weight-600 text-h6 py-7"
                          >
                            Add node
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-expand-transition>
          </v-col>
        </v-row>
        <v-row
          v-if="e1 > steps.addNode && e1 < steps.haveNode"
          justify="center"
        >
          <v-col md="8" cols="12">
            <v-scroll-x-reverse-transition>
              <v-card
                v-show="!cardLoading && e1 >= steps.newNode"
                width="100%"
                height="386px"
                transition="slide-x-transition"
                elevation="0"
                class="px-2 rounded-lg mt-5"
              >
                <v-row justify="center" v-if="e1 === steps.newNode">
                  <v-col md="6" class="text-center" align-self="end">
                    <lottie-vue-player
                      ref="anim"
                      src="https://lottie.host/d93bca6a-cfea-4e40-a6b9-4d191832b2ef/uWgbTRaCzm.json"
                      :autoplay="true"
                      height="290px"
                      class="transparent"
                    />
                    <h3 class="blackText--text font-weight-bold mt-n15">
                      Your node has been added <br />
                      to Alice network
                    </h3>
                    <v-row justify="center" class="mt-2">
                      <div class="d-flex justify-center mr-n4">
                        <div class="mt-3">
                          <b class="primary--text text-body-1">
                            Preparing your dashboard
                          </b>
                        </div>
                        <div>
                          <lottie-vue-player
                            ref="anim"
                            src="https://lottie.host/1fb3a319-394b-446d-8fce-824aa4f1787c/xjtL4nMuB2.json"
                            :autoplay="true"
                            :loop="true"
                            playerSize="minimal"
                            height="50px"
                            :style="{ width: '100%', heigh: '50px' }"
                            class="transparent ml-n1 width_contant"
                          />
                        </div>
                      </div>
                    </v-row>
                    <p class="blackText--text text-caption">
                      It can take up to 10 minutes.
                    </p>
                  </v-col>
                </v-row>
                <v-responsive
                  v-if="e1 === steps.beforHaveNode"
                  class="mt-10"
                  height="386px"
                >
                  <v-row class="full-height" justify="center">
                    <v-col
                      cols="4"
                      md="4"
                      align-self="center"
                      height="386px"
                      class="text-center"
                    >
                      <h5 class="info--text text-body-1">
                        Your dashboard is ready!
                        <v-icon color="green">mdi-check</v-icon>
                      </h5>
                      <v-btn
                        block
                        large
                        @click="checkHaveNode"
                        color="primary"
                        class="mt-5 font-weight-bold rounded-md"
                        elevation="0"
                        >Launch my dashboard</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-responsive>
              </v-card>
            </v-scroll-x-reverse-transition>
          </v-col>
        </v-row>
        <v-row v-if="e1 === steps.haveNode" justify="center" class="mt-15 px-5">
          <v-col cols="12">
            <v-card
              color="rgba(81, 88, 246, 0.1)"
              class="node_id_card px-5 py-4 rounded-lg"
              elevation="0"
            >
              <v-row>
                <v-col class="d-inline-flex align-center">
                  <img width="43px" src="@/assets/dashboard/WalletCheck.svg" />
                  <h5 class="pl-5 text-h6 font-weight-regular">
                    Uniqueness Verification:
                  </h5>
                </v-col>
                <v-col cols="7" class="d-inline-flex align-center justify-end">
                  <h5 class="mr-8 text-h6 font-weight-600">
                    Muon presale Participation
                  </h5>
                  <v-btn
                    elevation="0"
                    color="rgba(81, 88, 246, 0.1)"
                    class="primary--text rounded-sm font-weight-medium text-body-2 text-capitalize"
                  >
                    Go to verification center
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="3" cols="12">
            <v-card
              color="rgba(81, 88, 246, 0.1)"
              class="node_id_card px-5 py-4 rounded-lg"
              elevation="0"
            >
              <h6 class="textGray--text text-subtitle-1 font-weight-bold">
                IP Address
              </h6>
              <v-row justify="end" class="mt-2">
                <v-col align-self="center" class="text-right">
                  <b class="mr-2">{{ nodeInfo.nodeIP }}</b>
                  <v-btn @click="copyURL(nodeInfo.nodeIP)" icon>
                    <v-img src="@/assets/dashboard/Copy.svg"></v-img>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="3" cols="12">
            <v-card
              color="rgba(81, 88, 246, 0.1)"
              class="node_id_card px-5 py-4 rounded-lg"
              elevation="0"
            >
              <h6 class="textGray--text text-subtitle-1 font-weight-bold">
                Node ID
              </h6>
              <v-row justify="end" class="mt-2">
                <v-col align-self="center" class="text-right">
                  <b class="mr-2">
                    {{ nodeInfo.id }}
                  </b>
                  <v-btn icon @click="copyURL(nodeInfo.id)">
                    <v-img src="@/assets/dashboard/Copy.svg"></v-img>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="3" cols="12">
            <v-card
              color="rgba(81, 88, 246, 0.1)"
              class="node_id_card px-5 py-4 rounded-lg"
              elevation="0"
            >
              <h6 class="textGray--text text-subtitle-1 font-weight-bold">
                Node address
              </h6>
              <v-row justify="end" class="mt-2">
                <v-col align-self="center" class="text-right">
                  <b class="mr-2"
                    >{{ addressToShort(nodeInfo.nodeAddress) }}
                  </b>
                  <v-btn icon @click="copyURL(nodeInfo.nodeAddress)">
                    <v-img src="@/assets/dashboard/Copy.svg"></v-img>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="3" cols="12">
            <v-card
              color="rgba(81, 88, 246, 0.1)"
              class="node_id_card px-5 py-4 rounded-lg"
              elevation="0"
            >
              <h6 class="textGray--text text-subtitle-1 font-weight-bold">
                peer ID
              </h6>
              <v-row justify="end" class="mt-2">
                <v-col align-self="center" class="text-right">
                  <b class="mr-2">{{ addressToShort(nodeInfo.peerId) }}</b>
                  <v-btn icon @click="copyURL(nodeInfo.peerId)">
                    <v-img src="@/assets/dashboard/Copy.svg"></v-img>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-if="e1 === steps.haveNode" justify="center" class="px-5">
          <v-col md="4" cols="12">
            <v-card
              color="rgba(81, 88, 246, 0.1)"
              class="full-height node_id_card px-2 py-4 rounded-lg text-center"
              elevation="0"
            >
              <v-row>
                <v-col>
                  <h6 class="text-subtitle-1 font-weight-medium">Uptime</h6>
                  <div class="mt-2">
                    <v-progress-circular
                      v-if="nodeIsActive != 'Exited'"
                      :rotate="-180"
                      :size="100"
                      :width="15"
                      :value="Number(nodeInfo.onlinePercent.split('%')[0])"
                    >
                      <v-avatar
                        color="#5158F666"
                        size="60"
                        class="font-weight-bold"
                      >
                        {{ nodeInfo.onlinePercent }}
                      </v-avatar>
                    </v-progress-circular>
                    <v-icon class="text-h2" color="primary" v-else
                      >mdi-exit-run</v-icon
                    >
                  </div>
                </v-col>
                <v-col>
                  <div>
                    <h6 class="text-subtitle-1 font-weight-medium">Status</h6>
                  </div>
                  <b
                    :class="[
                      'info--text',
                      'text-h5',
                      'font-weight-medium',
                      { 'gray3--text': nodeIsActive === 'Offline' },
                    ]"
                    >{{ nodeIsActive }}</b
                  >
                  <br />
                  <v-btn
                    elevation="0"
                    color="rgba(81, 88, 246, 0.1)"
                    class="mt-9 primary--text rounded-sm font-weight-medium"
                    @click="setnodeDetailsDialogModel(true)"
                    >Details</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="4" cols="12">
            <v-card
              color="rgba(81, 88, 246, 0.1)"
              class="full-height node_id_card px-5 py-4 rounded-lg"
              elevation="0"
            >
              <v-row justify="spase-between">
                <v-col cols="8">
                  <h6 class="black--text text-h6">Staked ALICE</h6>
                </v-col>
                <v-col class="text-right">
                  <b>{{ nodeInfo.staked }}</b>
                </v-col>
              </v-row>
              <v-card-actions class="px-0">
                <v-row justify="end" class="mt-10">
                  <v-col align-self="center" class="text-right">
                    <v-btn
                      disabled
                      elevation="0"
                      color="rgba(81, 88, 246, 0.1)"
                      class="primary--text font-weight-medium rounded-sm"
                      >Stake more</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col md="4" cols="12">
            <v-card
              class="full-height node_id_card px-5 py-4 rounded-lg reward_background"
              elevation="0"
            >
              <v-row justify="spase-between">
                <v-col cols="5">
                  <h6 class="black--text text-h6">Reward</h6>
                </v-col>
                <v-col class="text-right">
                  <b>{{ nodeInfo.rewardAmount }} ALICE</b> <br />
                </v-col>
              </v-row>
              <v-card-actions class="px-0">
                <v-row justify="end" class="mt-10">
                  <v-col align-self="center" class="text-right">
                    <v-btn
                      disabled
                      elevation="0"
                      color="#FEEFE9"
                      class="primaryOrange--text rounded-sm font-weight-medium text-subtitle-1"
                    >
                      Withdraw
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <nodeDetailsDialog
          v-if="e1 === steps.haveNode"
          :nodeInfo="nodeInfo"
          :sample-dialog-model="nodeDetailsDialogModel"
          :sample-dialog-model-seter="setnodeDetailsDialogModel"
        ></nodeDetailsDialog>
        <v-dialog
          v-if="isCorrectChain && isConnected"
          dark
          v-model="dialog"
          width="500"
        >
          <v-card color="#fff">
            <v-card-text>
              <v-row
                v-html="dialogContext.text"
                class="mt-5 px-5"
                justify="center"
              >
              </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false"> OK! </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-responsive>
    </v-main>
    <v-footer
      class="mt-10 transparent"
      v-if="e1 === steps.haveNode && !cardLoading"
    >
      <v-row justify="end">
        <v-col md="5" cols="12">
          <AllertCard
            class="mt-5"
            v-for="(value, i) in nodeInfo.messages"
            :message="value.message"
            :key="i"
          ></AllertCard>
        </v-col>
      </v-row>
    </v-footer>
    <v-footer padless color="rgba(0,0,0,0)">
      <v-col cols="12" class="text-center myFont">
        <div class="d-flex align-center text-center justify-center">
          <span class="mx-2 myFont">Powered by</span>
          <img src="@/assets/muon-logo1.svg" alt="" />
        </div>
      </v-col>
    </v-footer>
    <v-snackbar
      text
      top
      width="200"
      min-width="200"
      color="info"
      v-model="copySnackbar"
      :timeout="1500"
      class="text-center"
    >
      Copy to clipboard
    </v-snackbar>
  </v-app>
</template>

<script>
import Web3 from "web3";
import {
  approve,
  checkApproved,
  stake,
  mint,
  newAddNode,
  getBalanceaOfTokenTest,
  nodeAdressIsValid,
  rewardChecker,
} from "@/utils/transactions";
import { getNodeInfo, checkIP } from "@/utils/fetch";
import particles from "@/components/Particles";
import moment from "moment";
import Header from "@/components/Header.vue";
import nodeDetailsDialog from "@/components/nodeDetailsDialog.vue";
import detectEthereumProvider from "@metamask/detect-provider";
import { ValidateIPaddress } from "@/utils/formatChecker";
import AllertCard from "@/components/AllertCard.vue";
import { mapState } from "pinia";
import { useTestStore } from "@/stores/teststore";
const mainChainId = 0x61;
const STEPS = {
  mint: 1,
  approve: 2,
  addNode: 3,
  newNode: 4,
  beforHaveNode: 5,
  haveNode: 6,
};

export default {
  name: "Dashboard",

  components: { Header, particles, nodeDetailsDialog, AllertCard },

  data: () => ({
    provider: null,
    nodeIpStatus: "",
    testEl: 1, // remove it befor build
    cardLoading: true,
    copySnackbar: false,
    TR: true,
    themeIsDark: false,
    dialog: false,
    steps: STEPS,
    heightSize: Number,
    account: "",
    addressShow: "connect Wallet",
    web3: "",
    currntIdChain: NaN,
    isCorrectChain: false,
    isConnected: false,
    e1: 1,
    isApproved: false,
    stakeAmount: 1000,
    peerId: "",
    nodeAddress: "",
    totalStake: 0,
    haveNode: false,
    tokenTestBalance: 0,
    haveEnoughTokenTEst: false,
    mintAmount: 1000,
    nativeTokenBalance: 0,
    nodeInfo: Object,
    btnLoading: false,
    nodeIsActive: "Loading...",
    nodeUptime: "",
    rewardAmount: 0,
    downNodeTimes: [],
    nodeIPInput: "",
    checkHaveNodeInterval: Object,
    dialogContext: { text: String },
    nodeDetailsDialogModel: false,
    stakerAddress: "",
    isIPValid: true,
    ipCheckLoading: false,
    minMint: [
      (value) => !!value || "Required.",
      (value) => (value && value <= 1000 && value > 0) || "min:1 , max:1000",
    ],
    minStakeAmount: [
      (value) => !!value || "Required.",
      (value) =>
        (value && value >= 1000 - totalStake) || "At least 1000 test tokens",
    ],
  }),
  watch: {
    haveNode(newState, oldState) {
      if (!newState) {
        this.e1 = this.steps.mint;
      }
    },
    themeIsDark(newState, oldState) {
      this.$vuetify.theme.dark = newState;
      localStorage.themeIsDark = newState;
    },
    isConnected(newState, oldState) {
      if (newState) {
        this.getTokenTestBalance();
      } else {
        this.addressShow = "connect Wallet";
      }
    },
    tokenTestBalance(newBalance, oldBalance) {
      if (newBalance >= 1000) {
        this.haveEnoughTokenTEst = true;
      } else {
        this.haveEnoughTokenTEst = false;
      }
    },
    isApproved() {
      if (this.isApproved && this.e1 === this.steps.approve) {
        this.e1 = this.steps.addNode;
      }
    },
    currntIdChain() {
      this.checkNetwork();
    },
    account() {
      if (this.account) {
        this.isConnected = true;
      }
      this.addressShow =
        this.account.slice(0, 4) +
        "..." +
        this.account.slice(this.account.length - 4, this.account.length);
    },
    e1(newE1, oldE1) {
      if (newE1 === this.steps.addNode) {
        this.getTokenTestBalance();
      }
      if (newE1 === this.steps.approve && this.isApproved) {
        this.e1 = this.steps.addNode;
      }
      if (newE1 === this.steps.newNode || newE1 === this.steps.haveNode) {
        this.checkHaveNodeInterval = setInterval(
          this.checkHaveNode(false),
          15 * 1000
        );
        console.log(this.checkHaveNodeInterval);
      } else {
        clearInterval(this.checkHaveNodeInterval);
      }
    },
  },
  methods: {
    setnodeDetailsDialogModel(input) {
      this.nodeDetailsDialogModel = input;
    },
    addressToShort(address) {
      return (
        address.slice(0, 4) +
        "..." +
        address.slice(address.length - 4, address.length)
      );
    },
    changeTheme() {
      this.themeIsDark = !this.themeIsDark;
    },
    getNativeBalance() {
      this.web3.eth.getBalance(this.account).then((res) => {
        const balance = this.web3.utils.fromWei(res);
        this.nativeTokenBalance = Number(balance);
        if (res === "0") {
          this.dialog = true;
          this.dialogContext.text = `
          <h4
                  class="myFont blackText--text text-h6 mt-10 underlite_dialog"
                >
                  Not enough gas...
                </h4>
                <p class="myFont blackText--text text-center mt-5">
                  You need more TEST BNB as gas tokens to use the dashboard.<br />
                  Use the following faucet to get some.
                </p>

                <a
                  class="primaryOrange--text"
                  target="_blank"
                  href="https://testnet.bnbchain.org/faucet-smart"
                  >BNB Smart Chain Faucet</a
                >
          `;
        }
      });
    },
    mint() {
      this.btnLoading = true;
      mint(this.account, this.web3, this.mintAmount)
        .then((res) => {
          this.getTokenTestBalance();
          this.e1 = this.steps.approve;
        })
        .finally(() => {
          this.btnLoading = false;
        });
    },
    getTokenTestBalance() {
      getBalanceaOfTokenTest(this.account, this.web3).then((res) => {
        this.tokenTestBalance = res;
      });
    },
    rewardCheck(flag = true) {
      if (flag) {
        rewardChecker(this.account, this.web3).then((res) => {
          this.rewardAmount = Number(res).toFixed(4);
          this.rewardCheck(false);
        });
      } else {
        setTimeout(() => {
          rewardChecker(this.account, this.web3).then((res) => {
            this.rewardAmount = Number(res).toFixed(4);
          });
          this.rewardCheck(false);
        }, 15000);
      }
    },
    checkHaveNode(cardLoadingRefresh = true) {
      if (this.account) {
        if (cardLoadingRefresh) {
          this.cardLoading = true;
          console.log("card loading on");
        }
        getNodeInfo(this.account)
          // getNodeInfo(28)
          .then((res) => {
            res = res["result"];
            if (res && res != "node not found") {
              this.haveNode = true;
              this.nodeIsActive = "Loading...";
              this.nodeInfo["isNew"] = res["node"]["isNew"];
              if (this.e1 === this.steps.newNode) {
                this.e1 = this.nodeInfo["isNew"]
                  ? this.steps.newNode
                  : this.steps.beforHaveNode;
              } else {
                this.e1 = this.nodeInfo["isNew"]
                  ? this.steps.newNode
                  : this.steps.haveNode;
              }
              this.nodeInfo["active"] = res["node"]["active"];
              const tests = res["node"]["tests"];
              this.nodeInfo["nodeAddress"] = res["node"]["nodeAddress"];
              this.nodeInfo["id"] = res["node"]["id"];
              this.nodeInfo["peerId"] = res["node"]["peerId"];
              this.nodeInfo["startTime"] = moment(
                res["node"]["startTime"] * 1000
              );
              if (res["node"]["endTime"]) {
                this.nodeInfo["endTime"] = moment(
                  res["node"]["endTime"] * 1000
                );
                this.nodeIsActive = "Exited";
              } else {
                this.nodeInfo["endTime"] = false;
              }
              this.nodeInfo["rewardAmount"] = Number(
                this.web3.utils.fromWei(
                  String(res["reward"]["earned"]),
                  "ether"
                )
              ).toFixed(4);
              this.nodeInfo["nodeIP"] = res["node"]["ip"];
              this.nodeInfo["staked"] = this.web3.utils.fromWei(
                res["reward"]["balance"].toLocaleString("fullwide", {
                  useGrouping: false,
                })
              );
              this.nodeInfo["onlinePercent"] = res["reward"]["onlinePercent"];

              if (this.nodeInfo["active"]) {
                this.nodeIsActive = this.nodeInfo.isNew
                  ? "Your node has been added to the network successfully. Its initialization will take a few minutes."
                  : tests["networking"] && tests["peerInfo"] && tests["status"]
                  ? "Online"
                  : "Offline";
                this.nodeInfo["messages"] = res["messages"];
                this.nodeInfo["rewardPercent"] = res["reward"]["rewardPercent"];
                this.nodeInfo["history"] = res["history"].reverse();

                var messages = [];
                for (var [i, valueFrom] of this.nodeInfo["history"].entries()) {
                  if (!valueFrom["isOnline"]) {
                    var flag = true;
                    var from = valueFrom;
                    // var fromDate = new Date(from["timestamp"] * 1000);
                    var fromDate = moment(from["timestamp"] * 1000);
                    var fromMoment = moment(fromDate);
                    for (var [j, valueTo] of this.nodeInfo["history"]
                      .slice(i)
                      .entries()) {
                      if (valueTo["isOnline"]) {
                        // var toDate = new Date(valueTo["timestamp"] * 1000);
                        var toDate = moment(valueTo["timestamp"] * 1000);
                        var toMoment = moment(toDate);
                        messages.push(
                          `${fromDate.format(
                            "YYYY-M-D H:m:s A"
                          )} until ${toDate.format(
                            "YYYY-M-D H:m:s A"
                          )} for ${toMoment.to(fromMoment, true)}`
                        );
                        flag = false;
                        break;
                      }
                    }
                    if (flag) {
                      messages.push(
                        `${fromDate.format(
                          "YYYY-M-D H:m:s A"
                        )} until now for ${moment().to(fromMoment, true)}`
                      );
                    }
                  }
                }
                this.nodeInfo["downNodeTimes"] = messages;
              }
            } else if (res === "node not found") {
              if (cardLoadingRefresh) {
                this.haveNode = false;
                this.e1 = this.steps.mint;
              }
            } else {
              if (cardLoadingRefresh) this.haveNode = "error";
            }
          })
          .finally(() => {
            this.cardLoading = false;
          });
      }
    },
    getNodeAddressPeerIdByIP(ip) {
      if (ip === "aji maji la taraji") {
        this.e1 = 4;
      } else {
        let temp = ip.split("http://");
        ip = temp.length > 1 ? temp[1].split("/")[0] : temp[0].split("/")[0];
        let port = ip.split(":");
        if (port[1]) {
          ip = port[0];
          port = ":" + port[1];
        } else {
          port = "";
        }
        if (ValidateIPaddress(ip)) {
          this.ipCheckLoading = true;
          console.log(ip + port);
          checkIP(ip + port)
            .then((res) => {
              if (res.success) {
                if ("staker" in res.result) {
                  this.stakerAddress = res.result.staker;
                  this.nodeAddress = "";
                  this.peerId = "";
                  this.nodeIpStatus = "info";
                } else {
                  this.nodeAddress = res.result.address;
                  this.peerId = res.result.peerId;
                  this.stakerAddress = false;
                  this.isIPValid = true;
                  this.nodeIpStatus = "success";
                }
              } else {
                this.isIPValid = false;
                this.nodeAddress = "";
                this.peerId = "";
                this.stakerAddress = "";
                this.nodeIpStatus = "error";
                console.log("bad");
              }
            })
            .finally(() => {
              this.ipCheckLoading = false;
            });
        } else {
          this.nodeIpStatus = "invalidIp";
          this.ipCheckLoading = false;
        }
      }
    },
    addNode() {
      this.btnLoading = true;

      newAddNode(this.account, this.web3, this.nodeAddress, this.peerId)
        .then(() => {
          this.checkHaveNode();
          this.getTokenTestBalance();
          this.e1 = this.steps.newNode;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.btnLoading = true;
        });
    },
    stake() {
      stake(this.account, this.web3, this.stakeAmount);
    },
    checkApproved() {
      checkApproved(this.account, this.web3).then((res) => {
        this.isApproved = res;
      });
    },
    checkNetwork() {
      if (this.currntIdChain != mainChainId) {
        this.isCorrectChain = false;
        this.cardLoading = false;
      } else {
        this.isCorrectChain = true;
        ethereum
          .request({ method: "eth_accounts" })
          .then((accounts) => {
            if (accounts.length === 0) {
              console.log("Please connect to MetaMask.");
              this.cardLoading = false;
            } else if (accounts.length && this.isCorrectChain) {
              this.connectToMetamask();
            }
          })
          .catch(console.error);
      }
    },
    async switchToCorrectChain() {
      try {
        await window.ethereum
          .request({
            method: "wallet_switchEthereumChain",
            // params: [{ chainId: this.web3.utils.toHex(mainChainId) }],
            params: [{ chainId: this.web3.utils.toHex(mainChainId) }],
          })
          .then(() => {
            this.checkApproved();
          });
      } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "BNB Smart Chain Testnet",
                chainId: this.web3.utils.toHex(mainChainId),
                nativeCurrency: {
                  name: "tBNB",
                  decimals: 18,
                  symbol: "tBNB",
                },
                rpcUrls: ["https://bsc-testnet.public.blastapi.io"],
                blockExplorerUrls: ["https://testnet.bscscan.com/"],
              },
            ],
          });
        }
      }
    },
    approve() {
      this.btnLoading = true;
      approve(this.account, this.web3)
        .then((res) => {
          this.checkApproved();
        })
        .finally(() => {
          this.btnLoading = false;
        });
    },
    connectToMetamask() {
      ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((res) => {
          if (res.length === 0) {
            console.log("Please connect to MetaMask.");
            this.cardLoading = false;
            console.log(this.cardLoading);
          } else {
            const account = res[0];
            this.account = account;
            this.checkApproved();
            this.getNativeBalance();
            this.checkHaveNode();
            this.getTokenTestBalance();
          }
        })
        .catch((err) => {
          this.cardLoading = false;
          if (err.code === 4001) {
            console.log("Plase connect to MetaMask");
          } else {
            console.error(err);
          }
        });
    },
    async getChainId() {
      ethereum.request({ method: "eth_chainId" }).then((res) => {
        this.currntIdChain = res;
      });
    },
    async copyURL(mytext) {
      try {
        await navigator.clipboard.writeText(mytext);
        this.copySnackbar = true;
      } catch ($e) {
        console.log("Cannot copy");
      }
    },
    startApp(provider) {
      // If the provider returned by detectEthereumProvider is not the same as
      // window.ethereum, something is overwriting it, perhaps another wallet.
      if (provider !== window.ethereum) {
        console.error("Do you have multiple wallets installed?");
      }
      // Access the decentralized web!
    },
  },
  async created() {
    document.title = "Join ALICE network";
    this.provider = await detectEthereumProvider();
    if (this.provider) {
      this.startApp(this.provider); // Initialize your app
    } else {
      console.log("Please install MetaMask!");
      this.cardLoading = false;
    }
    this.web3 = new Web3(window.ethereum);
    this.getChainId();
  },
  computed: {
    ...mapState(useTestStore, ["jafarTest"]),
    haveNativeToken() {
      const balance = Number(this.nativeTokenBalance);
      if (balance) return true;
      else return false;
    },
    getHeightSize() {
      return window.innerHeight;
    },
    muonTestTokenShow() {
      if (this.tokenTestBalance) {
        const amount = Number(this.tokenTestBalance);
        return amount.toFixed(2);
      } else {
        return "0";
      }
    },
  },
  mounted() {
    ethereum.on("accountsChanged", async (accounts) => {
      if (accounts.length === 0) {
        console.log("Please connect to MetaMask.");
        this.cardLoading = false;
      } else {
        const address = accounts[0];
        this.account = address;
        this.checkApproved();
        this.getTokenTestBalance();
        this.getNativeBalance();
        this.checkHaveNode();
      }
    });

    ethereum.on("disconnect", () => {
      this.isConnected = false;
    });
    ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
      this.currntIdChain = chainId;
      this.checkNetwork();
    });

    if (localStorage.themeIsDark === "true") {
      this.themeIsDark = true;
    }
  },
  updated() {},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;600&display=swap");

html {
  overflow-y: auto;
}

#particles-js {
  max-height: 98%;
}
.v-application {
  font-family: "Montserrat", sans-serif !important;
}
.myFont {
  font-family: "Montserrat", sans-serif !important;
}
h3 {
  font-family: "Montserrat", sans-serif !important;
  font-weight: 300 !important;
  color: white;
}
.backgorundpic_dark {
  background-color: #313144 !important;
}
.backgorundpic_light {
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: #f8faff !important;
  background-image: url("@/assets/Blur.svg") !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-attachment: fixed !important;
  background-position: center !important;
}
.full-width {
  width: 100% !important;
}
.btn-gradiant {
  background: linear-gradient(
    222.13deg,
    #55eaf7 6.63%,
    #52c0e9 50.03%,
    #4e78d2 75.32%,
    #4b4ac4 90.16%
  );
}
.btn_warning {
  background: linear-gradient(90deg, #fac739 -2.48%, #fb0d6a 102.48%);
}
.btn_error {
  background: linear-gradient(90deg, #fac739 -2.48%, #fb0d6a 102.48%);
}
.gradiant_two {
  background: linear-gradient(
    236.98deg,
    #55eaf7 -13.66%,
    #52c0e9 36.8%,
    #4e78d2 66.21%,
    #4b4ac4 83.46%,
    #4a39be 99.27%
  );
}
.yellow_gradiant {
  background: linear-gradient(226.04deg, #f4de1c 13.15%, #f4841c 95.48%);
}
.Muon_Dark_blue {
  background: #4a39be;
}
.old_Muon_Blue {
  background: #5158f6;
}
.footer_gradiant_light {
  background: linear-gradient(
    236.98deg,
    #55eaf7 -13.66%,
    #52c0e9 36.8%,
    #4e78d2 66.21%,
    #4b4ac4 83.46%,
    #4a39be 99.27%
  );
}
.footer_gradiant_dark {
  background: linear-gradient(90deg, #fac739 -2.48%, #fb0d6a 102.48%);
}
.main_title {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  line-height: 44px;
  /* identical to box height */

  text-align: center;
  text-transform: capitalize;

  /* Primary Gradient */

  background: linear-gradient(135deg, #5158f6 0%, #822df5 33.12%, #f3a761 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.title_card_box {
  width: 100%;
  height: 100px;
  margin-top: -50px;
  border-radius: 18px;
  border: 2px solid #5158f6;
  background-color: #ffffff;
  background-image: url("@/assets/presale-header.svg");
  background-repeat: no-repeat;
  background-position: center;
  filter: drop-shadow(0px 8px 18px rgba(81, 88, 246, 0.15));
}
.title_card_box_font {
  font-size: 24px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  line-height: 44px;
  text-align: center;

  /* Black */

  color: #323245;
}
.subtitle_card_box_font {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500 !important;
  font-size: 14px;
  line-height: 29px;
  text-align: center;

  /* Primary */

  color: #5158f6;
}
.v-stepper__header {
  box-shadow: none !important;
}
.stepper_header_text {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  text-align: center;

  /* Black */

  color: #323245;
}
.enough_tokens_message {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 44px;
  text-align: center;

  /* Black */

  color: #323245;
}
.input_fild {
  background: rgba(233, 239, 246, 0.75);
}
.underlite_dialog {
  text-decoration-line: underline;
  text-decoration-color: #5158f6;
  text-decoration-thickness: 9px;
}
.footer_card {
  width: 80%;
  height: 100px;
  margin-bottom: -50px;
  border-radius: 18px;
  border: 2px solid #5158f6;
  background-color: #ffffff;
  background-image: url("@/assets/presale-header.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.divider_step_box {
  border-left: 3px solid #f59569;
}
.border-dashed {
  border-left: 3px dashed #b1b1b1;
}
.height-steps {
  height: 60px;
}
.step_deactive {
  background-color: #d9e2ed;
}
.setp_box {
  border-radius: 8px;
  max-height: 50px;
  max-width: 105px;
}
.height-step-box {
  height: 50px;
}
.text-small {
  font-size: 10px;
}
.full-width {
  width: 100%;
}
.input-card-min-height {
  min-height: 280px;
}
.full-height {
  height: 100%;
}
.transparent {
  background: none;
}
.node_id_card {
  background: rgba(81, 88, 246, 0.13);
}
.reward_background {
  background: linear-gradient(
    92.79deg,
    rgba(246, 150, 81, 0.177) -1.84%,
    rgba(246, 81, 121, 0.183) 108.07%
  );
}
.v-progress-circular__underlay {
  stroke: none;
}
.v-progress-circular__overlay {
  stroke: #5158f6;
  stroke-width: 2px;
  filter: drop-shadow(0px 0px 1px #5158f6);
}
.v-btn .v-progress-circular__overlay {
  stroke: white;
}
.steps_title {
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
}
.steps_sub_title {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
}
.steps_title_active {
  font-weight: 500;
}
.width_contant {
  width: fit-content !important;
  display: inline-block;
}
.font-weight-600 {
  font-weight: 600 !important;
}
.gray-filter {
  filter: invert(59%) sepia(5%) saturate(924%) hue-rotate(174deg)
    brightness(96%) contrast(83%);
}
.center_margin_auto {
  margin: 0 auto;
}
.title_card {
  min-width: 320px;
  max-width: 350px;
}
</style>
