import React from "react";
import PropTypes from "prop-types";
import Link from "@/components/Link";
import BigMessage from "@/components/BigMessage";
import NoTaggedObjectsFound from "@/components/NoTaggedObjectsFound";
import EmptyState, { EmptyStateHelpMessage } from "@/components/empty-state/EmptyState";
import DynamicComponent from "@/components/DynamicComponent";
import { currentUser } from "@/services/auth";
import HelpTrigger from "@/components/HelpTrigger";

export default function QueriesListEmptyState({ page, searchTerm, selectedTags }) {
  if (searchTerm !== "") {
    return <BigMessage message="未找到任何匹配的查询" icon="fa-search" />;
  }
  if (selectedTags.length > 0) {
    return <NoTaggedObjectsFound objectType="queries" tags={selectedTags} />;
  }
  switch (page) {
    case "favorites":
      return <BigMessage message="这里显示你收藏的所有查询" icon="fa-star" />;
    case "archive":
      return <BigMessage message="这里显示所有归档的查询" icon="fa-archive" />;
    case "my":
      const my_msg = currentUser.hasPermission("create_query") ? (
        <span>
          <Link.Button href="queries/new" type="primary" size="small">
           创建你的第一个查询吧! 
          </Link.Button>{" "}
          <HelpTrigger className="f-13" type="QUERIES" showTooltip={false}>
           需要帮助 
          </HelpTrigger>
        </span>
      ) : (
        <span>未找到任何匹配项</span>
      );
      return <BigMessage icon="fa-search">{my_msg}</BigMessage>;
    default:
      return (
        <DynamicComponent name="QueriesList.EmptyState">
          <EmptyState
            icon="fa fa-code"
            illustration="query"
            description="从数据源获取数据"
            helpMessage={<EmptyStateHelpMessage helpTriggerType="QUERIES" />}
          />
        </DynamicComponent>
      );
  }
}

QueriesListEmptyState.propTypes = {
  page: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  selectedTags: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
