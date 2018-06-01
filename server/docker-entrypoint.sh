#!/bin/bash
export ENABLE_NODE_LOG=YES
source $HOME/.bashrc
agenthub start alinodeConfig.json&
node index.js
