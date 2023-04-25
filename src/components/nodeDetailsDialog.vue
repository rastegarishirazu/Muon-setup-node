<template>
  <v-dialog
    content-class="rounded-xl"
    width="700px"
    v-model="nodeDetailsDialogModel"
  >
    <v-card>
      <v-card-title class="text-h5 lighten-2">
        Node Details
        <v-spacer></v-spacer>
        <v-btn @click="nodeDetailsDialogModel = false" icon>
          <v-icon color="black">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-expansion-panels flat>
          <v-expansion-panel readonly>
            <v-expansion-panel-header
              >Joined at <v-spacer></v-spacer>{{ nodeInfo.startTime }}
              <template v-slot:actions>
                <v-icon color="primary"> </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-divider></v-divider>
          </v-expansion-panel>
          <v-expansion-panel v-if="nodeInfo.endTime" readonly>
            <v-expansion-panel-header
              >Exited at <v-spacer></v-spacer>{{ nodeInfo.endTime }}
              <template v-slot:actions>
                <v-icon color="primary"> </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-divider></v-divider>
          </v-expansion-panel>

          <v-expansion-panel v-if="nodeInfo.downNodeTimes">
            <v-expansion-panel-header
              >Down times <v-spacer></v-spacer>
              {{ nodeInfo.downNodeTimes.length }} time(s)
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ul>
                <li v-for="(item, i) in nodeInfo.downNodeTimes" :key="i">
                  {{ item }}
                </li>
              </ul>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { useDashboardStore } from "@/stores/dashboardStore";
import { mapState, mapWritableState } from "pinia";

export default {
  data: () => ({}),
  methods: {},

  computed: {
    ...mapState(useDashboardStore, ["nodeInfo"]),
    ...mapWritableState(useDashboardStore, ["nodeDetailsDialogModel"]),
  },
};
</script>
