"use client";
import { useParams } from "next/navigation";
import { Card, Tabs, Form, App } from "antd";
import { useState } from "react";

// Import components
import EventInfo from "../../../components/EventDetail/EventInfo";
import TeamList from "../../../components/EventDetail/TeamList";
import TeamRegistrationModal from "../../../components/EventDetail/TeamRegistrationModal";
import MatchManagement from "../../../components/EventDetail/MatchManagement";
import MatchDetailModal from "../../../components/EventDetail/MatchDetailModal";
import MatchResultModal from "../../../components/EventDetail/MatchResultModal";
import RoundRobinSetupModal from "../../../components/EventDetail/RoundRobinSetupModal";
import StandingsTable from "../../../components/EventDetail/StandingsTable";
import FinalResults from "../../../components/EventDetail/FinalResults";

// Mock data
import { events, initialTeams } from "../../../data/mockData";

export default function EventDetailPage() {
  // Get message API from App component
  const { message } = App.useApp();
  
  // State management
  const [teams, setTeams] = useState(initialTeams);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [matches, setMatches] = useState([]);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matchDetailOpen, setMatchDetailOpen] = useState(false);
  const [selectedMatchDetail, setSelectedMatchDetail] = useState(null);
  const [roundRobinRounds, setRoundRobinRounds] = useState(1);
  const [roundRobinSetupOpen, setRoundRobinSetupOpen] = useState(false);
  const [knockoutPhase, setKnockoutPhase] = useState(false);

  // Forms
  const [form] = Form.useForm();
  const [resultForm] = Form.useForm();
  const [roundRobinForm] = Form.useForm();

  // Get event data
  const params = useParams();
  const id = params.id;
  const event = events.find((e) => String(e.id) === String(id));

  if (!event) {
    return (
      <Card style={{ maxWidth: 600, margin: "40px auto" }}>
        <div>ไม่พบข้อมูลรายการแข่ง</div>
      </Card>
    );
  }

  // Filter teams for this event (only approved teams)
  const eventTeams = teams.filter(
    (t) => String(t.eventId) === String(event.id) && t.status === "approved"
  );

  // Generate matches based on competition type
  const generateMatches = () => {
    if (eventTeams.length < 2) {
      message.warning("ต้องมีทีมที่ได้รับอนุมัติอย่างน้อย 2 ทีมเพื่อจับคู่");
      return;
    }

    let newMatches = [];

    if (event.competitionType === "knockout") {
      // Knockout: Single elimination bracket with bye system
      const shuffledTeams = [...eventTeams].sort(() => Math.random() - 0.5);

      // Handle odd number of teams - give bye to random team
      if (shuffledTeams.length % 2 === 1) {
        const byeTeam = shuffledTeams.pop();
        newMatches.push({
          id: `BYE1`,
          round: 1,
          team1: byeTeam,
          team2: null,
          winner: byeTeam,
          status: "completed",
          isBye: true,
          score1: 0,
          score2: 0,
        });
        message.info(`${byeTeam.name} ได้รับ BYE ผ่านรอบแรกโดยอัตโนมัติ`);
      }

      // Create matches for remaining teams
      for (let i = 0; i < shuffledTeams.length; i += 2) {
        if (shuffledTeams[i + 1]) {
          newMatches.push({
            id: `M${Math.floor(i / 2) + 1}`,
            round: 1,
            team1: shuffledTeams[i],
            team2: shuffledTeams[i + 1],
            winner: null,
            status: "pending",
            isBye: false,
            score1: 0,
            score2: 0,
          });
        }
      }
    } else if (event.competitionType === "round-robin") {
      // Round Robin: Every team plays every other team for specified number of rounds
      for (let round = 1; round <= roundRobinRounds; round++) {
        for (let i = 0; i < eventTeams.length; i++) {
          for (let j = i + 1; j < eventTeams.length; j++) {
            newMatches.push({
              id: `R${round}M${newMatches.filter(m => m.round === round).length + 1}`,
              round: round,
              team1: eventTeams[i],
              team2: eventTeams[j],
              winner: null,
              status: "pending",
              isBye: false,
              score1: 0,
              score2: 0,
            });
          }
        }
      }
    } else if (event.competitionType === "group-knockout") {
      // Group Stage + Knockout: Divide into groups first
      const groupSize = 4;
      const numGroups = Math.ceil(eventTeams.length / groupSize);
      const shuffledTeams = [...eventTeams].sort(() => Math.random() - 0.5);

      // Create groups
      for (let g = 0; g < numGroups; g++) {
        const groupTeams = shuffledTeams.slice(
          g * groupSize,
          (g + 1) * groupSize
        );

        // Round robin within each group
        for (let i = 0; i < groupTeams.length; i++) {
          for (let j = i + 1; j < groupTeams.length; j++) {
            newMatches.push({
              id: `G${g + 1}M${
                newMatches.filter((m) => m.group === g + 1).length + 1
              }`,
              round: 1,
              group: g + 1,
              team1: groupTeams[i],
              team2: groupTeams[j],
              winner: null,
              status: "pending",
              isBye: false,
              score1: 0,
              score2: 0,
            });
          }
        }
      }
    }

    setMatches(newMatches);
    message.success(`สร้างการจับคู่สำเร็จ! จำนวน ${newMatches.length} คู่`);
  };

  // Update match result
  const updateMatchResult = (matchId, winnerId, score1, score2) => {
    setMatches((prev) =>
      prev.map((match) => {
        if (match.id === matchId) {
          const winner =
            winnerId === match.team1?.id ? match.team1 : match.team2;
          return {
            ...match,
            winner,
            status: "completed",
            score1: parseInt(score1) || 0,
            score2: parseInt(score2) || 0,
          };
        }
        return match;
      })
    );
    message.success("บันทึกผลการแข่งขันสำเร็จ");
  };

  // Generate next round matches (for knockout)
  const generateNextRound = () => {
    if (event.competitionType !== "knockout") {
      message.warning("ฟีเจอร์นี้ใช้ได้เฉพาะการแข่งขันแบบ Knockout เท่านั้น");
      return;
    }

    const currentRound = Math.max(...matches.map((m) => m.round));
    const completedMatches = matches.filter(
      (m) => m.round === currentRound && m.status === "completed"
    );
    const totalCurrentRoundMatches = matches.filter(
      (m) => m.round === currentRound
    ).length;

    if (completedMatches.length !== totalCurrentRoundMatches) {
      message.warning("กรุณาให้ผลการแข่งขันในรอบปัจจุบันให้ครบก่อน");
      return;
    }

    const winners = completedMatches.map((m) => m.winner).filter(Boolean);

    if (winners.length < 2) {
      message.info(
        "การแข่งขันจบแล้ว! ผู้ชนะคือ " + (winners[0]?.name || "ไม่มี")
      );
      return;
    }

    // Create next round matches
    const nextRoundMatches = [];
    const shuffledWinners = [...winners].sort(() => Math.random() - 0.5);

    // Handle bye for odd number of winners
    if (shuffledWinners.length % 2 === 1) {
      const byeTeam = shuffledWinners.pop();
      nextRoundMatches.push({
        id: `BYE${currentRound + 1}`,
        round: currentRound + 1,
        team1: byeTeam,
        team2: null,
        winner: byeTeam,
        status: "completed",
        isBye: true,
        score1: 0,
        score2: 0,
      });
    }

    // Create matches for remaining winners
    for (let i = 0; i < shuffledWinners.length; i += 2) {
      if (shuffledWinners[i + 1]) {
        nextRoundMatches.push({
          id: `R${currentRound + 1}M${Math.floor(i / 2) + 1}`,
          round: currentRound + 1,
          team1: shuffledWinners[i],
          team2: shuffledWinners[i + 1],
          winner: null,
          status: "pending",
          isBye: false,
          score1: 0,
          score2: 0,
        });
      }
    }

    setMatches((prev) => [...prev, ...nextRoundMatches]);
    message.success(
      `สร้างรอบ ${currentRound + 1} สำเร็จ! จำนวน ${
        nextRoundMatches.length
      } คู่`
    );
  };

  // Calculate team standings for Round Robin and Group Stage
  const calculateStandings = (matchesData, groupId = null) => {
    const standings = {};

    // Initialize standings for all teams
    const relevantTeams = groupId
      ? eventTeams.filter((team) => {
          // Find which group this team belongs to
          const teamMatches = matchesData.filter(
            (m) =>
              m.group === groupId &&
              (m.team1?.id === team.id || m.team2?.id === team.id)
          );
          return teamMatches.length > 0;
        })
      : eventTeams;

    relevantTeams.forEach((team) => {
      standings[team.id] = {
        team,
        played: 0,
        won: 0,
        lost: 0,
        points: 0,
        scoreFor: 0,
        scoreAgainst: 0,
        scoreDiff: 0,
      };
    });

    // Calculate from completed matches
    const relevantMatches = groupId
      ? matchesData.filter(
          (m) => m.group === groupId && m.status === "completed" && !m.isBye
        )
      : matchesData.filter((m) => m.status === "completed" && !m.isBye);

    relevantMatches.forEach((match) => {
      const team1Stats = standings[match.team1?.id];
      const team2Stats = standings[match.team2?.id];

      if (team1Stats && team2Stats) {
        team1Stats.played++;
        team2Stats.played++;
        team1Stats.scoreFor += match.score1;
        team1Stats.scoreAgainst += match.score2;
        team2Stats.scoreFor += match.score2;
        team2Stats.scoreAgainst += match.score1;

        if (match.winner?.id === match.team1?.id) {
          team1Stats.won++;
          team1Stats.points += 3; // 3 points for win
          team2Stats.lost++;
        } else if (match.winner?.id === match.team2?.id) {
          team2Stats.won++;
          team2Stats.points += 3;
          team1Stats.lost++;
        }

        team1Stats.scoreDiff = team1Stats.scoreFor - team1Stats.scoreAgainst;
        team2Stats.scoreDiff = team2Stats.scoreFor - team2Stats.scoreAgainst;
      }
    });

    return Object.values(standings).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.scoreDiff !== a.scoreDiff) return b.scoreDiff - a.scoreDiff;
      return b.scoreFor - a.scoreFor;
    });
  };

  // Check if competition is finished
  const isCompetitionFinished = () => {
    if (matches.length === 0) return false;

    if (event.competitionType === "knockout") {
      const allMatches = matches.filter(m => !m.isBye);
      const completedMatches = allMatches.filter(m => m.status === "completed");
      const lastRound = Math.max(...matches.map(m => m.round));
      const lastRoundMatches = matches.filter(m => m.round === lastRound);
      const completedLastRound = lastRoundMatches.filter(m => m.status === "completed");
      
      return completedMatches.length === allMatches.length && 
             completedLastRound.length === 1; // Only one winner left
    }

    if (event.competitionType === "round-robin") {
      const allMatches = matches.filter(m => !m.isBye);
      const completedMatches = allMatches.filter(m => m.status === "completed");
      return completedMatches.length === allMatches.length;
    }

    if (event.competitionType === "group-knockout") {
      const allMatches = matches.filter(m => !m.isBye);
      const completedMatches = allMatches.filter(m => m.status === "completed");
      const knockoutMatches = matches.filter(m => m.phase === "knockout" || m.round > 1);
      
      if (knockoutMatches.length === 0) return false; // Group stage not finished
      
      const lastRound = Math.max(...knockoutMatches.map(m => m.round));
      const lastRoundMatches = knockoutMatches.filter(m => m.round === lastRound);
      const completedLastRound = lastRoundMatches.filter(m => m.status === "completed");
      
      return completedMatches.length === allMatches.length && 
             completedLastRound.length === 1; // Only one winner left
    }

    return false;
  };

  // Get final results
  const getFinalResults = () => {
    if (!isCompetitionFinished()) return null;

    if (event.competitionType === "knockout") {
      const lastRound = Math.max(...matches.map(m => m.round));
      const finalMatch = matches.find(m => m.round === lastRound && m.status === "completed");
      const champion = finalMatch?.winner;
      
      // Get runner-up (loser of final match)
      const runnerUp = finalMatch?.team1?.id === champion?.id ? finalMatch?.team2 : finalMatch?.team1;
      
      return {
        champion,
        runnerUp,
        type: "knockout"
      };
    }

    if (event.competitionType === "round-robin") {
      const standings = calculateStandings(matches);
      return {
        champion: standings[0]?.team,
        runnerUp: standings[1]?.team,
        third: standings[2]?.team,
        standings: standings.slice(0, 3),
        type: "round-robin"
      };
    }

    if (event.competitionType === "group-knockout") {
      const knockoutMatches = matches.filter(m => m.phase === "knockout" || m.round > 1);
      const lastRound = Math.max(...knockoutMatches.map(m => m.round));
      const finalMatch = knockoutMatches.find(m => m.round === lastRound && m.status === "completed");
      const champion = finalMatch?.winner;
      
      // Get runner-up (loser of final match)
      const runnerUp = finalMatch?.team1?.id === champion?.id ? finalMatch?.team2 : finalMatch?.team1;
      
      return {
        champion,
        runnerUp,
        type: "group-knockout"
      };
    }

    return null;
  };

  // Event handlers
  const handleTeamRegistration = async (values) => {
    setRegisterLoading(true);
    // Generate registration number
    const registrationNumber = `REG${Date.now().toString().slice(-6)}`;
    
    // Simulate upload and registration
    setTimeout(() => {
      setTeams((prev) => [
        ...prev,
        {
          ...values,
          id: `T${Math.floor(Math.random() * 10000)}`,
          eventId: event.id,
          status: "pending",
          submittedAt: new Date(),
          registrationNumber,
          teamLogo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=60&h=60&fit=crop&crop=center",
          schoolLogo: "https://images.unsplash.com/photo-1562774053-701939374585?w=40&h=40&fit=crop&crop=center",
        },
      ]);
      setRegisterLoading(false);
      setRegisterOpen(false);
      message.success(`สมัครทีมสำเร็จ! หมายเลขการสมัคร: ${registrationNumber}`);
      form.resetFields();
    }, 1000);
  };

  const handleMatchResult = (values) => {
    updateMatchResult(
      selectedMatch.id,
      values.winner,
      values.score1,
      values.score2
    );
    setResultModalOpen(false);
    setSelectedMatch(null);
    resultForm.resetFields();
  };

  const handleRoundRobinSetup = (values) => {
    setRoundRobinRounds(values.rounds);
    generateMatches();
    setRoundRobinSetupOpen(false);
    roundRobinForm.resetFields();
  };

  // Tab items
  const tabItems = [
    {
      key: "1",
      label: "ทีมที่สมัคร",
      children: (
        <TeamList
          teams={teams.filter((t) => String(t.eventId) === String(event.id))}
          eventTeams={eventTeams}
          onRegisterClick={() => setRegisterOpen(true)}
        />
      ),
    },
    {
      key: "2",
      label: "การจับคู่",
      children: (
        <MatchManagement
          matches={matches}
          event={event}
          eventTeams={eventTeams}
          roundRobinRounds={roundRobinRounds}
          onGenerateMatches={generateMatches}
          onGenerateNextRound={generateNextRound}
          onMatchDetail={(match) => {
            setSelectedMatchDetail(match);
            setMatchDetailOpen(true);
          }}
          onRecordResult={(match) => {
            setSelectedMatch(match);
            setResultModalOpen(true);
            resultForm.setFieldsValue({
              winner: null,
              score1: 0,
              score2: 0,
            });
          }}
          onRoundRobinSetup={() => {
            setRoundRobinSetupOpen(true);
            roundRobinForm.setFieldsValue({ rounds: roundRobinRounds });
          }}
        />
      ),
    },
    ...(event.competitionType === "round-robin" ||
    event.competitionType === "group-knockout"
      ? [
          {
            key: "3",
            label: "ตารางคะแนน",
            children: (
              <StandingsTable
                event={event}
                matches={matches}
                eventTeams={eventTeams}
                calculateStandings={calculateStandings}
                onGenerateKnockoutFromGroups={() => {
                  // Handle knockout generation from groups
                  console.log("Generate knockout from groups");
                }}
              />
            ),
          },
        ]
      : []),
    ...(isCompetitionFinished()
      ? [
          {
            key: "4",
            label: "ผลการแข่งขัน",
            icon: <TrophyOutlined />,
            children: (
              <FinalResults
                event={event}
                finalResults={getFinalResults()}
              />
            ),
          },
        ]
      : []),
  ];

  return (
    <Card style={{ maxWidth: 1200, margin: "40px auto" }} >
      <EventInfo event={event} eventTeams={eventTeams} />
      <Tabs defaultActiveKey="1" items={tabItems} />

      {/* Modals */}
      <TeamRegistrationModal
        open={registerOpen}
        onCancel={() => {
          setRegisterOpen(false);
          form.resetFields();
        }}
        onSubmit={handleTeamRegistration}
        loading={registerLoading}
        event={event}
        form={form}
      />

      <MatchDetailModal
        open={matchDetailOpen}
        onCancel={() => {
          setMatchDetailOpen(false);
          setSelectedMatchDetail(null);
        }}
        selectedMatch={selectedMatchDetail}
        event={event}
      />

      <MatchResultModal
        open={resultModalOpen}
        onCancel={() => {
          setResultModalOpen(false);
          setSelectedMatch(null);
          resultForm.resetFields();
        }}
        onSubmit={handleMatchResult}
        selectedMatch={selectedMatch}
        form={resultForm}
      />

      <RoundRobinSetupModal
        open={roundRobinSetupOpen}
        onCancel={() => {
          setRoundRobinSetupOpen(false);
          roundRobinForm.resetFields();
        }}
        onSubmit={handleRoundRobinSetup}
        eventTeams={eventTeams}
        form={roundRobinForm}
      />
    </Card>
  );
}