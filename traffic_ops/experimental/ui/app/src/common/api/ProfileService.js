/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var ProfileService = function(Restangular, locationUtils, messageModel) {

    this.getProfiles = function(queryParams) {
        return Restangular.all('profiles').getList(queryParams);
    };

    this.getProfile = function(id) {
        return Restangular.one("profiles", id).get();
    };

    this.createProfile = function(profile) {
        return Restangular.service('profiles').post(profile)
            .then(
            function() {
                messageModel.setMessages([ { level: 'success', text: 'Profile created' } ], true);
                locationUtils.navigateToPath('/admin/profiles');
            },
            function(fault) {
                messageModel.setMessages(fault.data.alerts, false);
            }
        );
    };

    this.updateProfile = function(profile) {
        return profile.put()
            .then(
                function() {
                    messageModel.setMessages([ { level: 'success', text: 'Profile updated' } ], false);
                },
                function(fault) {
                    messageModel.setMessages(fault.data.alerts, false);
                }
        );
    };

    this.deleteProfile = function(id) {
        return Restangular.one("profiles", id).remove()
            .then(
                function() {
                    messageModel.setMessages([ { level: 'success', text: 'Profile deleted' } ], true);
                },
                function(fault) {
                    messageModel.setMessages(fault.data.alerts, true);
                }
        );
    };

    this.getParameterProfiles = function(paramId) {
        return Restangular.one('parameters', paramId).getList('profiles');
    };

};

ProfileService.$inject = ['Restangular', 'locationUtils', 'messageModel'];
module.exports = ProfileService;
