#!/usr/bin/env bash

# Set the value of a single select field.
function setSingleSelectField() {
  # (1) arguments
  local projectId=$1
  local itemId=$2
  local fieldName=$3
  local fieldValue=$4

  # (2) get ids
  local metadata=$(
    gh api graphql -f query="
      query {
        node(id: \"$projectId\") {
          ... on ProjectV2 {
            fields(first: 20) {
              nodes {
                ... on ProjectV2Field {
                  id
                  name
                }
                ... on ProjectV2SingleSelectField {
                  id
                  name
                  options {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    "
  )

  local fieldId=$(
    echo $metadata | \
    grep -oE "\"id\":\"[^\"]+\",\"name\":\"$fieldName\"" | \
    cut -d, -f1 | \
    cut -d: -f2 | \
    sed 's/"//g'
  )

  local optionId=$(
    echo $metadata | \
    grep -oE "\"id\":\"[^\"]+\",\"name\":\"$fieldValue\"" | \
    cut -d, -f1 | \
    cut -d: -f2 | \
    sed 's/"//g'
  )

  # (3) set field
  gh api graphql -f query="
    mutation {
      updateProjectV2ItemFieldValue(
        input: {
          projectId: \"$projectId\"
          itemId: \"$itemId\"
          fieldId: \"$fieldId\"
          value: {
            singleSelectOptionId: \"$optionId\"
          }
        }
      ) {
        projectV2Item {
          id
        }
      }
    }
  "
}

########
# main #
########

# (1) arguments
readonly title="Review dependency pull requests"
readonly username=$1
readonly projectNumber=$2
readonly assignee=$3
readonly statusOption=$4
readonly originOption=$5
readonly whenOption=$6
readonly priorityOption=$7
readonly complexityOption=$8

# (2) get project id
declare projectId=$(
  gh api graphql -f query="
    query {
      user(login: \"$username\"){
        projectV2(number: $projectNumber) {
          id
          title
        }
      }
    }
  " | \
  grep -oE '"id":"[^"]+"' | \
  cut -d: -f2 | \
  sed 's/"//g'
)

# (3) get assignee id
declare assigneeId=$(
  gh api -H "Accept: application/vnd.github+json" /users/$assignee | \
  grep -oE '"node_id":"[^"]+"' | \
  cut -d: -f2 | \
  sed 's/"//g'
)

# (4) create issue
declare itemId=$(
  gh api graphql -f query="
    mutation {
      addProjectV2DraftIssue(input: {projectId: \"$projectId\" title: \"$title\" assigneeIds: [\"$assigneeId\"]}) {
        projectItem {
          id
        }
      }
    }
  " | \
  grep -oE '"id":"[^"]+"' | \
  cut -d: -f2 | \
  sed 's/"//g'
)

# (5) set issue fields
setSingleSelectField $projectId $itemId Status $statusOption
setSingleSelectField $projectId $itemId Priority $priorityOption
setSingleSelectField $projectId $itemId Complexity $complexityOption
setSingleSelectField $projectId $itemId Origin $originOption
setSingleSelectField $projectId $itemId When $whenOption
