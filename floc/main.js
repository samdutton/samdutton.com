/* Copyright 2021 Google LLC.
SPDX-License-Identifier: Apache-2.0 */

const cohortIdEl = document.getElementById('cohort-id');
const cohortVersionEl = document.getElementById('cohort-version');
const completionTimeEl = document.getElementById('completion-time');
const startTime = window.performance.now();

let numTries = 0;

async function getCohortId() {
  try {
    if (document.interestCohort) {
      const interestCohort = await document.interestCohort();
      console.log('document.interestCohort():', interestCohort);
      cohortIdEl.textContent = interestCohort.id + ".";
      cohortVersionEl.textContent = interestCohort.version + ".";
      const elapsed = Math.round(window.performance.now() - startTime) / 1000;
      completionTimeEl.textContent = `Completed in ${elapsed} seconds.`;
    } else {
       cohortIdEl.textContent = cohortVersionEl.textContent = 
         'not supported by this browser';
    }
    clearInterval(intervalID);
  } catch(error) {
    console.log(error);
    ++numTries;
    if (numTries > 100) {
      cohortIdEl.textContent = cohortVersionEl.textContent = 'not available.';
      clearInterval(intervalID);
    }
  }
}

const intervalID = setInterval(getCohortId, 100);